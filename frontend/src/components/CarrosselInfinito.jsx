import React, { useRef, useState, useEffect } from "react";
import './css/CarrosselInfinito.css'

// Criacao do componente que implementa um carrossel infinito para ser usado na home
export default function InfiniteCarousel({ children }) {
    const slides = React.Children.toArray(children);
    const total = slides.length;
    const trackRef = useRef(null);
    const [index, setIndex] = useState(1); 
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Move para o próximo
    function next() {
        if (isTransitioning) return;
        setIndex((i) => i + 1);
        setIsTransitioning(true);
    }

    // Move para o anterior
    function prev() {
        if (isTransitioning) return;
        setIndex((i) => i - 1);
        setIsTransitioning(true);
    }

    // Ajusta transform quando o index muda
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const slide = track.querySelector(".carousel-slide");
        if (!slide) return;

        const slideW = slide.getBoundingClientRect().width;

        track.style.transition = "transform 420ms cubic-bezier(.22,.9,.36,1)";
        track.style.transform = `translateX(${-index * slideW}px)`;
    }, [index]);

    // Inicializa: posiciona no primeiro slide (considerando clones)
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const slide = track.querySelector(".carousel-slide");
        if (!slide) return;

        const slideW = slide.getBoundingClientRect().width;

        track.style.transition = "none";
        track.style.transform = `translateX(${-slideW}px)`;

        function onResize() {
            const s = track.querySelector(".carousel-slide");
            if (!s) return;
            const w = s.getBoundingClientRect().width;
            track.style.transition = "none";
            track.style.transform = `translateX(${-index * w}px)`;
        }
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []); 

    function handleTransitionEnd() {
        const track = trackRef.current;
        if (!track) return;

        const slide = track.querySelector(".carousel-slide");
        if (!slide) return;

        const slideW = slide.getBoundingClientRect().width;

        setIsTransitioning(false);
        if (index === 0) {
            track.style.transition = "none";
            setIndex(total);
            track.style.transform = `translateX(${-total * slideW}px)`;
            return;
        }
        if (index === total + 1) {
            track.style.transition = "none";
            setIndex(1);
            track.style.transform = `translateX(${-1 * slideW}px)`;
            return;
        }
    }

    const items = [];
    if (total > 0) {
        items.push(slides[total - 1]); 
        slides.forEach((s) => items.push(s));
        items.push(slides[0]); 
    }

    // teclas ← e →
    useEffect(() => {
        function onKey(e) {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        }

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isTransitioning]);

    return (
        <>
            <div className="infinite-carousel">
                <button aria-label="Anterior" className="carousel-arrow carousel-arrow--left" onClick={prev}>‹</button>

                <div className="carousel-viewport">
                    <div className="carousel-track" ref={trackRef} onTransitionEnd={handleTransitionEnd}>
                        {items.map((child, i) => (
                            <div className="carousel-slide" key={i}>
                                {child}
                            </div>
                        ))}
                    </div>
                </div>

                <button aria-label="Próximo" className="carousel-arrow carousel-arrow--right" onClick={next}>›</button>
            </div>
        </>
    );
}
