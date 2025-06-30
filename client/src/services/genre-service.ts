import type { IGenre } from "@/commons/types";
import { createGenericService } from "./generic-service";

const genreURL = "/genre";
const GenreService = createGenericService<IGenre>(genreURL);
export default GenreService;