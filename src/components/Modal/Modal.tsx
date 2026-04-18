import type React from "react";
import type { Character } from "../../types/Character";
import s from "./Modal.module.css";
import { useEffect, useRef } from "react";

export default function Modal({
  character,
  setIsModalOpen,
}: {
  character: Character | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactNode {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [setIsModalOpen]);

  return (
    <>
      <div className={s.back}></div>
      <div ref={modalRef} className={s.modalContainer}>
        <button className={s.closeButton} onClick={() => setIsModalOpen(false)}>
          <span>+</span>
        </button>
        <div className={s.imageContainer}>
            <img src={character?.image} />
        </div>
        <div className={s.characterDescription}>
            <h2>{character?.name}</h2>
            <div><span><span className={s.lineName}>Status:</span> {character?.status}</span></div>
            <div><span><span className={s.lineName}>Species:</span> {character?.species}</span></div>
            <div><span><span className={s.lineName}>Gender:</span> {character?.gender}</span></div>
            <div><span><span className={s.lineName}>Origin:</span> {character?.origin?.name}</span></div>
            <div><span><span className={s.lineName}>Location:</span> {character?.location?.name}</span></div>
        </div>
      </div>
    </>
  );
}
