import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import SEO from '@/components/SEO';
import { IStandAloneMovie } from '@/types/index';
import { API_ENDPOINT_LAMBDA, s3FileUrl } from '@/config/index';
import { MovieRatingNames, MovieCategoryNames } from '@/utils/index';

type props = {
  movie: IStandAloneMovie;
};

interface params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<props, params> = async (ctx) => {
  try {
    const res = await fetch(`${API_ENDPOINT_LAMBDA}/movies?isActive=true&id=${ctx.params?.id}`);
    const data = await res.json();

    // Movie not found
    if (data && data.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        movie: data[0],
      },
      //? Next.js will attempt to re-generate the page:
      //? - When a request comes in
      //? - At most once every second if a new user request to see this page.
      revalidate: 60, //? In seconds
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const res = await fetch(`${API_ENDPOINT_LAMBDA}/movies?isActive=true`);
  const movies: IStandAloneMovie[] = await res.json();

  const paths =
    movies.length > 0
      ? movies.map((movie) => {
          return {
            params: { id: typeof movie.id === 'number' ? movie.id.toString() : movie.id },
          };
        })
      : [];

  return {
    //? Movies are generated at build time
    paths,
    //? Enable incremental static regenerating (ISR) additional pages
    fallback: true,
  };
};

const MoviePage = ({ movie }: props) => {
  const router = useRouter();

  //? If the page is not yet generated, this will be displayed
  //? initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <SEO
        siteTitle={movie.title}
        description={movie.description.length > 100 ? movie.description.substr(0, 100) : movie.description}
        image={`${s3FileUrl}${movie.thumbnail}`}
      />
      <div className="relative rounded-2xl overflow-hidden border">
        <Image
          loader={({ src, width, quality }) => `${s3FileUrl}${src}?w=${width}&q=${quality || 75}`}
          src={`${movie.banner}`}
          alt={movie.title}
          layout="responsive"
          width={1600}
          height={900}
          priority
        />
      </div>
      <h1 className="text-gray-800 font-semibold text-3xl sm:text-5xl">{movie.title}</h1>
      <p className="text-gray-800 font-semibold">{movie.description}</p>
      <div className="flex flex-wrap -m-1">
        <div className="bg-gray-800/75 rounded-full font-medium tracking-wider text-sm text-white py-1 px-2 m-1">
          {MovieCategoryNames[movie.category]}
        </div>
        <div className="bg-gray-800/75 rounded-full font-medium tracking-wider text-sm text-white py-1 px-2 m-1">
          {MovieRatingNames[movie.ratings]}
        </div>
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
  );
};

export default MoviePage;
