import { Dispatch, SetStateAction } from "react";
import { colorFilters } from "@/lib/colors";
import { UnsplashOrientation } from "@/types/UnsplashTypes";
import { ColorFilter } from "@/types/ColorType";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  orientation: UnsplashOrientation;
  setOrientation: Dispatch<SetStateAction<UnsplashOrientation>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  onApply: () => void;
};

export default function Filters({
  query,
  setQuery,
  color,
  setColor,
  orientation,
  setOrientation,
  onApply
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">PhotoExpress</h1>
      {!query && <p className="text-red-400">Введите любой запрос в поиск!</p> }
      <div className="relative w-full">
        <label htmlFor="search-input" className="font-semibold block mb-2">
          Поиск
        </label>
        <img
          src="/searchIcon.svg"
          alt="Поиск"
          className="absolute left-3 bottom-[10px] transform w-5 h-5 text-gray-400 pointer-events-none opacity-[0.5]"
        />
        <input
          id="search-input"
          type="text"
          value={query ?? ""}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск..."
          className="bg-white pl-10 px-3 py-2 border border-black/20 rounded-[10px] w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    </div>
      <div>
        <h3 className="font-semibold mb-2">Ориентация</h3>
      <select
        value={orientation}
        onChange={(e) => setOrientation(e.target.value as UnsplashOrientation)}
        className="w-full px-3 py-2 border border-black/20  rounded-[10px] bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="">Все</option>
        <option value="landscape">Горизонтальные</option>
        <option value="portrait">Вертикальные</option>
        <option value="squarish">Квадратные</option>
      </select>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Цвет</h3>
  <div className="flex flex-wrap gap-2">
  {colorFilters.map((c) => {
    const isSelected = color === c.value; 

    return (
      <button
        key={c.value}
        onClick={() => {
          if (isSelected) {
            setColor("");
          } else {
            setColor(c.value);
          }
        }} 
        className={`
          flex items-center bg-white border border-black/20 rounded-full px-2 cursor-pointer
          ${isSelected ? "py-1 border-purple-400 border-2" : "py-1.5"}
          transition-colors duration-200
        `}
      >
        <div className={`w-6 h-6 mr-[5px] rounded-full ${c.bgClass}`}></div>
        <span className="text-sm">{c.name}</span>
      </button>
    );
  })}
</div>
      </div>
      <button
        onClick={onApply}
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-[10px] hover:bg-purple-600 transition"
      >
        Применить фильтры
      </button>
    </div>
  );
}
