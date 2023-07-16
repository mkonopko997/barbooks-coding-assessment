import { useState } from "react";
import { useGames } from "src/hooks/useGames/useGames";
import { Link } from "react-router-dom";
import { Select } from "src/components/Select/Select";
import { platforms } from "src/constans/platforms";
import { CategoriesSelect } from "src/components/CategoriesSelect/CategoriesSelect";
import { sortByOptions } from "src/constans/sortByOptions";
import { useFiltersContext } from "src/contexts/FiltersContext";
import styles from "./Games.module.scss";

export const Games = () => {
  const [name, setName] = useState("");
  const { platform, setPlatform, sort, setSort } = useFiltersContext();
  const { data: games } = useGames();

  const getGamesList = () => {
    if (!games) {
      return <p className={styles.loading}>Loading...</p>;
    }

    return games
      .filter(({ title }) => title.toLowerCase().includes(name.toLowerCase()))
      .map(({ title, thumbnail, shortDescription, id }) => (
        <div className={styles.game} key={id}>
          <h3>{title}</h3>
          <div className={styles.content}>
            <img className={styles.thumbnail} src={thumbnail} />
            <div className={styles.description}>
              <div>{shortDescription}</div>
              <Link className={styles.viewMore} to={id.toString()}>
                View More
              </Link>
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchInput}>
        <input
          placeholder="Search by Name..."
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
      </div>
      <div className={styles.selects}>
        <Select
          value={platform}
          setValue={setPlatform}
          label="Filter by Platform"
          options={platforms}
        />
        <CategoriesSelect />
        <Select
          value={sort}
          setValue={setSort}
          label="Sort By"
          options={sortByOptions}
        />
      </div>
      <div className={styles.gameList}>{getGamesList()}</div>
    </div>
  );
};
