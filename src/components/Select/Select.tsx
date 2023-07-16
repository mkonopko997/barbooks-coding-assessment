import styles from "./Select.module.scss";

export const Select = ({
  value,
  setValue,
  label,
  options,
}: {
  value?: string;
  setValue: (val: string) => void;
  label: string;
  options: { name: string; value: string }[];
}) => {
  return (
    <div className={styles.container}>
      <div>{label}</div>
      <select
        value={value}
        onChange={({ target: { value: val } }) => setValue(val)}
      >
        <option value={undefined}></option>
        {options.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
