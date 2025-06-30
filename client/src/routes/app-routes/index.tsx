import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout";
// import { HomePage } from "@/pages/home";
import { RequireAuth } from "@/components/require-auth";
import { NotFound } from "@/pages/not-found";
import { GameListPage } from "@/pages/home";
import { ShopPage } from "@/pages/shop";
import { GameByGenrePage } from "@/pages/games-by-genre";
import { GamePage } from "@/pages/game";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<GameListPage />} />
        <Route path="/home" element={<GameListPage />} />
        <Route path="/game" element={<GameListPage />} />
        <Route path="/game" element={<GameListPage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/game/genre/:genreId" element={<GameByGenrePage />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/shop" element={<ShopPage />} />

          
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}