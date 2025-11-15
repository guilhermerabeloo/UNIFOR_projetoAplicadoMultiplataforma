import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import RelatoriosControllers from '../src/controllers/RelatoriosControllers.js';
import Feira from '../src/models/Feiras.js';
import Feirante from '../src/models/Feirantes.js';

describe('RelatoriosControllers (unit)', () => {
  // Antes de cada teste: limpar mocks e suprimir logs para deixar a saída limpa.
  // Isso evita que console.log/error polua o output do CI / do professor.
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});   // esconde logs
    vi.spyOn(console, 'error').mockImplementation(() => {}); // esconde erros esperados nos testes
  });

  // Depois de cada teste: restaurar spies/mocks para não interferir em outros testes.
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  // Helpers para simular req e res do Express sem precisar do servidor.
  const makeReq = (params = {}) => ({ params });
  const makeRes = () => {
    const res = {};
    // res.status retornando res permite encadear como no Express: res.status(500).json({...})
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  // Teste: listar feiras com sucesso
  it('buscarFeiras - sucesso', async () => {
    // Substitui Feira.find por uma Promise resolvida com um array de exemplo
    Feira.find = vi.fn().mockResolvedValue([{ _id: 'f1', descricao: 'Feira A' }]);

    const req = makeReq();
    const res = makeRes();

    await RelatoriosControllers.buscarFeiras(req, res);

    expect(Feira.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith([{ _id: 'f1', descricao: 'Feira A' }]);
  });

  // Teste: buscarFeiras quando o model lança erro -> deve retornar 500 com mensagem de erro
  it('buscarFeiras - erro -> retorna 500', async () => {
    Feira.find = vi.fn().mockRejectedValue(new Error('DB fail'));

    const req = makeReq();
    const res = makeRes();

    await RelatoriosControllers.buscarFeiras(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro buscar feiras' });
  });

  // Teste: feiraLandingPage retorna o documento via findById().lean()
  it('feiraLandingPage - sucesso (findById().lean())', async () => {
    // Mock que devolve um objeto com método lean() para simular comportamento do Mongoose
    Feira.findById = vi.fn().mockReturnValue({
      lean: () => Promise.resolve({ _id: 'f123', descricao: 'Feira X' })
    });

    const req = makeReq({ id: 'f123' });
    const res = makeRes();

    await RelatoriosControllers.feiraLandingPage(req, res);

    expect(Feira.findById).toHaveBeenCalledWith('f123');
    expect(res.json).toHaveBeenCalledWith({ _id: 'f123', descricao: 'Feira X' });
  });

  // Teste: feiraLandingPage quando lean() rejeita -> retorna 500
  it('feiraLandingPage - erro -> retorna 500', async () => {
    Feira.findById = vi.fn().mockReturnValue({
      lean: () => Promise.reject(new Error('DB fail'))
    });

    const req = makeReq({ id: 'qualquer' });
    const res = makeRes();

    await RelatoriosControllers.feiraLandingPage(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao montar landing page da feira' });
  });

  // Teste: listar feirantes com sucesso
  it('buscarFeirantes - sucesso', async () => {
    Feirante.find = vi.fn().mockResolvedValue([{ _id: 'p1', nome: 'João' }]);

    const req = makeReq();
    const res = makeRes();

    await RelatoriosControllers.buscarFeirantes(req, res);

    expect(Feirante.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith([{ _id: 'p1', nome: 'João' }]);
  });

  // Teste: buscarFeirantes quando o model lança erro -> retorna 500
  it('buscarFeirantes - erro -> retorna 500', async () => {
    Feirante.find = vi.fn().mockRejectedValue(new Error('DB fail'));

    const req = makeReq();
    const res = makeRes();

    await RelatoriosControllers.buscarFeirantes(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro buscar feirantes' });
  });

  // Teste: feiranteLandingPage retorna o documento via findById().lean()
  it('feiranteLandingPage - sucesso (findById().lean())', async () => {
    Feirante.findById = vi.fn().mockReturnValue({
      lean: () => Promise.resolve({ _id: 'p123', nome: 'Maria' })
    });

    const req = makeReq({ id: 'p123' });
    const res = makeRes();

    await RelatoriosControllers.feiranteLandingPage(req, res);

    expect(Feirante.findById).toHaveBeenCalledWith('p123');
    expect(res.json).toHaveBeenCalledWith({ _id: 'p123', nome: 'Maria' });
  });

  // Teste: feiranteLandingPage quando lean() rejeita -> retorna 500
  it('feiranteLandingPage - erro -> retorna 500', async () => {
    Feirante.findById = vi.fn().mockReturnValue({
      lean: () => Promise.reject(new Error('DB fail'))
    });

    const req = makeReq({ id: 'qualquer' });
    const res = makeRes();

    await RelatoriosControllers.feiranteLandingPage(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao montar landing page do feirante' });
  });
});