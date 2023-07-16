import { useEffect, useState } from "react";
import { useCategories } from "src/hooks/useCategories";
import { useFiltersContext } from "src/contexts/FiltersContext";
import styles from "./CategoriesSelect.module.scss";

export const CategoriesSelect = () => {
  const { data: categories } = useCategories();
  const [inputValue, setInputValue] = useState("");
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);
  const { categories: value, setCategories: setValue } = useFiltersContext();

  useEffect(() => {
    if (
      categories?.includes(inputValue) &&
      ["Enter", "Unidentified", null].includes(lastPressedKey)
    ) {
      setValue([...value, inputValue]);
      setInputValue("");
    }
  }, [categories, inputValue, lastPressedKey, setValue, value]);

  return (
    <div className={styles.multiselect}>
      <div>Filter by Category</div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          list="texts"
          placeholder="Start typing..."
          value={inputValue}
          style={{
            paddingLeft: 105 * value.length + 22,
          }}
          onKeyDown={({ key }) => {
            if (inputValue === "" && key === "Backspace") {
              setValue(value.slice(0, -1));
              return;
            }
            setLastPressedKey(key);
          }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <div className={styles.valuesContainer}>
          {value?.map((valueItem) => (
            <button
              key={valueItem}
              className={styles.valueItem}
              onClick={() => setValue(value.filter((el) => el !== valueItem))}
            >
              {valueItem}
            </button>
          ))}
        </div>
      </div>
      <datalist id="texts">
        {categories
          ?.filter((el) => !value.includes(el))
          .map((option) => <option key={option} value={option} />)}
      </datalist>
    </div>
  );
};
