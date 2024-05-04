import {FormEvent, useState} from "react";
import {List} from "../List/List";
import styles from "./Form.module.css";

export interface FormProps {
  id?: string;
  date: string;
  km: string;
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
    // if (form.id) {
    //   const updatedList = list.map((item) => {
    //     if (form.id === item.id) {
    //       return form;
    //     }
    //     return item;
    //   });
    //   setList(updatedList);
    // } else {
    //   const newItem = {
    //     id: `${new Date().toISOString()}`,
    //     date: form.date,
    //     km: form.km,
    //   };
    const updatedList = form.id
      ? list.map((item) => {
          // editElement
          if (form.id === item.id) {
            return form;
          }
          return item;
        })
      : [
          // addElement
          {
            id: `${new Date().toISOString()}`,
            date: form.date,
            km: form.km,
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
          type='text'
          id='date'
          onChange={handleFormValueChange}
          value={form.date}
        />
        <label htmlFor='km'></label>
        <input
          className={styles.input}
          type='text'
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
