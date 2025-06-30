import type { IGenre } from "@/commons/types"
import { Tag } from "primereact/tag";

interface IGenreProps {
   genre: IGenre;
}

export const GenreSubCard = ({genre}: IGenreProps) => {   
   return (
      <Tag severity="success" className="mr-3 mt-2 text-black" value={genre.name}></Tag>
      // <span className="p-tag p-tag-info mr-3">{genre.name}</span>
   )
}
