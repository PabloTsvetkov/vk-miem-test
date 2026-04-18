import React, { useEffect } from "react";

import s from "./CharactesList.module.css";
import { getCharacters } from "../../api/getCharactersApi";
import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Header/Header";
import {
  ContentCard,
  Input,
  Pagination,
  Select,
  SimpleGrid,
  Spinner,
} from "@vkontakte/vkui";
import { useState } from "react";
import type { CharacterStatus } from "../../types/QueryParams";
import type { Character } from "../../types/Character";
import Modal from "../../components/Modal/Modal";

export default function CharactersList(): React.ReactNode {
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [filter, setFilter] = useState<"" | CharacterStatus>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCharacter, setModalCharacter] = useState<null | Character>(null);

  const handleCardClick = (el: Character) => {
    setModalCharacter(el);
    setIsModalOpen(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "characters",
      {
        page: page,
        ...(filter && { status: filter }),
        ...(debouncedText && { name: debouncedText }),
      },
    ],
    queryFn: () =>
      getCharacters({
        page: page,
        ...(filter && { status: filter }),
        ...(debouncedText && { name: debouncedText }),
      }),
  });

  const handlePageChange = (page: number): void => {
    setPage(page);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text.trim());
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  const selectOptions = [
    {
      value: "",
      label: "All",
    },
    {
      value: "alive",
      label: "Alive",
    },
    {
      value: "dead",
      label: "Dead",
    },
    {
      value: "unknown",
      label: "Unknown",
    },
  ];

  return (
    <div className={s.pageMainContainer}>
      {isModalOpen ? (
        <Modal character={modalCharacter} setIsModalOpen={setIsModalOpen} />
      ) : (
        ""
      )}
      <Header />
      <div className={s.mainContentContainer}>
        <div className={s.controlsMainContainer}>
          <div className={s.inputContainer}>
            <Input
              name="input"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </div>
          <div className={s.selectContainer}>
            <Select
              options={selectOptions}
              value={filter}
              onChange={(_, selected) => {
                setFilter(selected as "" | CharacterStatus);
                setPage(1);
              }}
            />
          </div>
        </div>
        <div className={s.count}>Total count: {data?.info?.count}</div>
        {!isLoading && !isError ? (
          data?.results?.length ? (
            <>
              <div className={s.gridCont}>
                <SimpleGrid className={s.simpleGrid} gap={30} align="center">
                  {data.results.map((el) => {
                    const description = (
                      <div>
                        Status: {el?.status},
                        <br />
                        Species: {el.species}
                      </div>
                    );
                    return (
                      <ContentCard
                        key={el?.id}
                        width={"100%"}
                        height={150}
                        src={el?.image}
                        title={el?.name}
                        className={s.item}
                        description={description}
                        onClick={() => handleCardClick(el)}
                      />
                    );
                  })}
                </SimpleGrid>
              </div>
              <div className={s.paginationContainer}>
                <Pagination
                  currentPage={page}
                  totalPages={data?.info?.pages}
                  onChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <p className={s.emptyMsg}>Ничего не найдено. Измените поиск или фильтр.</p>
          )
        ) : isLoading ? (
          <>
            <Spinner size="xl"/>
          </>
        ) : (
          <>
            <p className={s.errorMsg}>Произошла ошибка, попробуйте перезагрузить страницу. Ошибка: {error.message}</p>
          </>
        )}
      </div>
    </div>
  );
}
