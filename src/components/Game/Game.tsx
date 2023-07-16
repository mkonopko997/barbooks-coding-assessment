import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MinimumSystemRequirements, useGame } from "src/hooks/useGame";
import styles from "src/components/Game/Game.module.scss";

export const Game = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGame(id);

  if (!data) {
    return <div>Loading...</div>;
  }

  const {
    thumbnail,
    minimumSystemRequirements,
    title,
    description,
    screenshots,
  } = data;

  return (
    <div className={styles.game}>
      <div className={styles.detailsContainer}>
        <div className={styles.image}>
          <img src={thumbnail} />
        </div>
        <div className={styles.details}>
          <div className={styles.descriptionContainer}>
            <div className={styles.requirements}>
              <h2>Requirements</h2>
              {Object.keys(minimumSystemRequirements).map((key) => (
                <div key={key}>
                  <h3>{key}</h3>
                  <div>
                    {
                      minimumSystemRequirements[
                        key as keyof MinimumSystemRequirements
                      ]
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.description}>
              <h2>{title}</h2>
              <div>{description}</div>
            </div>
          </div>
          <div className={styles.back}>
            <Link to="../">Back</Link>
          </div>
        </div>
      </div>

      <div className={styles.images}>
        {screenshots.map(({ image }) => (
          <img key={image} src={image} />
        ))}
      </div>
    </div>
  );
};
