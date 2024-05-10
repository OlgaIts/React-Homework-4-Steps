import {FormProps} from "../Form/Form";
import styles from "./List.module.css";

interface ListProps {
  list: FormProps[];
  onEdit?: (item: FormProps) => void;
  onDelete?: (item: FormProps) => void;
}

const locale = navigator.language;
const dateOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};
const userDate = new Intl.DateTimeFormat(locale, dateOptions);

export const List = ({list, onEdit, onDelete}: ListProps) => {
  const sortedList = list.sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );

  return (
    <div>
      <div className={styles["date-wrap"]}>
        <p>Дата (ДД.ММ.ГГ)</p>
        <p>Пройдено км</p>
        <p>Действия</p>
      </div>
      <ul className={styles.list}>
        {sortedList.map((item) => (
          <li className={styles["list-item"]} key={item.id}>
            <div>{userDate.format(Date.parse(item.date))}</div>
            <div>{item.km}</div>
            <div>
              <span
                className={styles["edit-btn"]}
                onClick={() => {
                  onEdit?.(item);
                }}
              >
                ✎
              </span>
              <span
                className={styles["delete-btn"]}
                onClick={() => {
                  onDelete?.(item);
                }}
              >
                ✘
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
