import Axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { API_ENDPOINT_LAMBDA, s3FileUrl } from '@/config/index';
import { categoryTypes, ISeason, IStandAloneMovie } from '@/types/index';

const fetchMovies = async ({ categoryName, seasonId }: { categoryName: categoryTypes; seasonId?: string }) => {
  const querystring = `isActive=true&category=${categoryName}&${
    seasonId ? `seasonID=${seasonId}&isEpisodic=true` : 'isEpisodic=false'
  }`;

  const res = await Axios.get(`${API_ENDPOINT_LAMBDA}/movies?${querystring}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

const fetchSeasons = async ({ categoryName }: { categoryName: categoryTypes }) => {
  const querystring = `isActive=true&category=${categoryName}`;

  const res = await Axios.get(`${API_ENDPOINT_LAMBDA}/seasons?${querystring}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

interface props {
  title: string;
  categoryName: categoryTypes;
  showSeason?: boolean;
  seasonId?: string;
}

const MoviesRowSlider: React.FC<props> = ({ title, categoryName, showSeason = false, seasonId }) => {
  const movies = useQuery<IStandAloneMovie[], Error>(
    [`${title} - ${categoryName} - movies`, { categoryName, seasonId }],
    () => fetchMovies({ categoryName, seasonId }),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: !showSeason,
    },
  );

  const seasons = useQuery<ISeason[], Error>(
    [`${title} - ${categoryName} - seasons`, { categoryName }],
    () => fetchSeasons({ categoryName }),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: showSeason,
    },
  );

  if (showSeason && seasons.isFetching === false && seasons.data && seasons.data.length > 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <div className="grid gap-5 sm:gap-y-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mb-6">
          {seasons.data.map((season) => (
            <div key={season.id} className="space-y-2 sm:space-y-1">
              <div className="overflow-hidden rounded-2xl shadow-xl border transition duration-500 ease-in-out transform hover:scale-105">
                <Link href={`/seasons/${season.id}`}>
                  <a>
                    <Image
                      loader={({ src, width, quality }) => `${s3FileUrl}${src}?w=${width}&q=${quality || 75}`}
                      src={`${season.thumbnail}`}
                      alt={season.title}
                      layout="responsive"
                      width={1600}
                      height={900}
                    />
                  </a>
                </Link>
              </div>
              <h6 className="text-gray-800 font-medium mt-3">{season.title}</h6>
              <div className="flex flex-wrap -m-1">
                <div className="bg-gray-800/75 rounded-full font-medium tracking-wider text-sm text-white py-1 px-2 m-1">
                  {season.isPaid ? 'PAID' : 'FREE'}
                </div>
                {season.isPaid && (
                  <div className="bg-gray-800/75 rounded-full font-medium tracking-wider text-sm text-white py-1 px-2 m-1">
                    {`One-Time : $${(season.price / 100).toFixed(2)}`}
                  </div>
                )}
                {season.isRentable && (
                  <div className="bg-gray-800/75 rounded-full font-medium tracking-wider text-sm text-white py-1 px-2 m-1">
                    {`Rent : $${(season.rentalPrice / 100).toFixed(2)} / ${
                      parseInt(season.rentalDays.toString()) > 0
                        ? `${season.rentalDays} days`
                        : `${season.rentalDays} day`
                    }`}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!showSeason && movies.isFetching === false && movies.data && movies.data.length > 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mb-6">
          {movies.data.map((movie) => (
            <div key={movie.id} className="space-y-2 sm:space-y-1">
              <div className="overflow-hidden rounded-2xl shadow-xl border transition duration-500 ease-in-out transform hover:scale-105">
                <Link href={`/movies/${movie.id}`}>
                  <a>
                    <Image
                      loader={({ src, width, quality }) => `${s3FileUrl}${src}?w=${width}&q=${quality || 75}`}
                      src={`${movie.thumbnail}`}
                      alt={movie.title}
                      layout="responsive"
                      width={1600}
                      height={900}
                    />
                  </a>
                </Link>
              </div>
              <h6 className="text-gray-800 font-medium mt-3">{movie.title}</h6>
              <div className="flex flex-wrap -m-1">
                <div className="bg-gray-800/75 rounded-full font-medium tracking-wider text-sm text-white py-1 px-2 m-1">
                  {movie.isEpisodic ? 'EPISODE' : 'MOVIE'}
                </div>
                <div className="bg-gray-800/75 rounded-full font-medium tracking-wider text-sm text-white py-1 px-2 m-1">
                  {movie.isPaid ? 'PAID' : 'FREE'}
                </div>
                {movie.isPaid && (
                  <div className="bg-gray-800/75 rounded-full font-medium tracking-wider text-sm text-white py-1 px-2 m-1">
                    {`One-Time : $${(movie.price / 100).toFixed(2)}`}
                  </div>
                )}
                {movie.isRentable && (
                  <div className="bg-gray-800/75 rounded-full font-medium tracking-wider text-sm text-white py-1 px-2 m-1">
                    {`Rent : $${(movie.rentalPrice / 100).toFixed(2)} / ${
                      parseInt(movie.rentalDays.toString()) > 0 ? `${movie.rentalDays} days` : `${movie.rentalDays} day`
                    }`}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default MoviesRowSlider;
