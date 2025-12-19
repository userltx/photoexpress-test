import type { ColorFilter } from "@/types/ColorType";

export const colorFilters: ColorFilter[] = [
  { name: "Черный и белый", value: "black_and_white", bgClass: "bg-gray-400" },
  { name: "Черный", value: "black", bgClass: "bg-black" },
  { name: "Белый", value: "white", bgClass: "bg-white border" },
  { name: "Желтый", value: "yellow", bgClass: "bg-yellow-400" },
  { name: "Оранжевый", value: "orange", bgClass: "bg-orange-500" },
  { name: "Красный", value: "red", bgClass: "bg-red-500" },
  { name: "Фиолетовый", value: "purple", bgClass: "bg-purple-500" },
  { name: "Розовый", value: "magenta", bgClass: "bg-pink-500" },
  { name: "Зеленый", value: "green", bgClass: "bg-green-500" },
  { name: "Бирюзовый", value: "teal", bgClass: "bg-teal-500" },
  { name: "Синий", value: "blue", bgClass: "bg-blue-500" },
];
