import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
interface IFormTelegram {
  username: string;
  email: string;
  subgect: string;
  description: string;
}
const TOKEN = import.meta.env.VITE_TG_TOKEN;
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

const TelegramBot = () => {
  const { register, handleSubmit } = useForm<IFormTelegram>();

  const messegeModel = (data: IFormTelegram) => {
    let messegeTG = `Username: <b>${data.username} </b>\n`;
    messegeTG += `Email Addres: <b>${data.email}</b>\n`;
    messegeTG += `Subject: <b>${data.subgect}</b>\n`;
    messegeTG += `Description: <b>${data.description}</b>\n`;
    return messegeTG;
  };

  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: messegeModel(data),
    });
  };

  return (
    <div>
      <h1>TelegramBot</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="username"
          type="text"
          {...register("username", { required: true })}
        />
        <input
          placeholder="email"
          type="text"
          {...register("email", { required: true })}
        />
        <input
          placeholder="subject"
          type="text"
          {...register("subgect", { required: true })}
        />
        <input
          placeholder="description"
          type="text"
          {...register("description", { required: true })}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default TelegramBot;
