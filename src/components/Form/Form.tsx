import {FormEvent, useState} from "react";
import {List} from "../List/List";
import styles from "./Form.module.css";

export interface FormProps {
  id?: string;
  date: string;
  km: number | string;
}

export const Form = () => {
  const [form, setForm] = useState<FormProps>({date: "", km: ""});
  const [list, setList] = useState<FormProps[]>([]);

  const handleFormValueChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = target;
    setForm((prevForm) => ({...prevForm, [id]: value}));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.date || !form.km) {
      return;
    }

    const updateList = () =>
      list.map((el) => {
        if (form.id && el.id === form.id) {
          return form;
        }
        if (el.date === form.date) {
          return {...el, km: Number(el.km) + Number(form.km)};
        }

        return el;
      });

    const hasDate = list.find(({date}) => date === form.date);

    const updatedList =
      form.id || hasDate
        ? updateList()
        : [
            {
              id: `${new Date().toISOString()}`,
              date: form.date,
              km: Number(form.km),
            },
            ...list,
          ];
    setList(updatedList);
    setForm({date: "", km: ""});
  };

  const editItem = (item: FormProps) => {
    const element = list.find(({id}) => id === item.id);
    if (element) {
      setForm(element);
    }
  };

  const deleteItem = (item: FormProps) => {
    const filteredList = list.filter(({id}) => id !== item.id);
    setList(filteredList);
  };

  return (
    <div className={styles.container}>
      <div className={styles["date-wrap"]}>
        <p>Дата (ДД.ММ.ГГ)</p>
        <p>Пройдено км</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor='date'></label>
        <input
          className={styles.input}
          type='date'
          id='date'
          onChange={handleFormValueChange}
          value={form.date}
        />
        <label htmlFor='km'></label>
        <input
          className={styles.input}
          type='number'
          id='km'
          onChange={handleFormValueChange}
          value={form.km}
        />
        <input className={styles.btn} type='submit' value='OK' />
      </form>

      <List list={list} onDelete={deleteItem} onEdit={editItem} />
    </div>
  );
};
