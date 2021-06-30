import SEO from '@/components/SEO';
import MoviesRowSlider from '@/components/MoviesRowSlider';

const Browse = () => {
  return (
    <div className="space-y-6">
      <SEO siteTitle="Browse" description="Browse movies & series here." />
      <h1 className="text-3xl text-gray-800 font-semibold underline">Browse movies & series by category!!</h1>
      <div className="space-y-8">
        <MoviesRowSlider title="Comedy" categoryName="comedy" />
        <MoviesRowSlider title="Comedy Series" categoryName="comedy" showSeason={true} />
        <MoviesRowSlider title="Controversial" categoryName="controversial" />
        <MoviesRowSlider title="Controversial Series" categoryName="controversial" showSeason={true} />
        <MoviesRowSlider title="Documentaries" categoryName="documentaries" />
        <MoviesRowSlider title="Documentaries Series" categoryName="documentaries" showSeason={true} />
        <MoviesRowSlider title="Drama" categoryName="drama" />
        <MoviesRowSlider title="Drama Series" categoryName="drama" showSeason={true} />
        <MoviesRowSlider title="Educational" categoryName="educational" />
        <MoviesRowSlider title="Educational Series" categoryName="educational" showSeason={true} />
        <MoviesRowSlider title="Episodic" categoryName="episodic" />
        <MoviesRowSlider title="Episodic Series" categoryName="episodic" showSeason={true} />
        <MoviesRowSlider title="Horror" categoryName="horror" />
        <MoviesRowSlider title="Horror Series" categoryName="horror" showSeason={true} />
        <MoviesRowSlider title="Music Video" categoryName="musicVideo" />
        <MoviesRowSlider title="Music Video Series" categoryName="musicVideo" showSeason={true} />
        <MoviesRowSlider title="Reality" categoryName="reality" />
        <MoviesRowSlider title="Reality Series" categoryName="reality" showSeason={true} />
        <MoviesRowSlider title="Shorts" categoryName="shorts" />
        <MoviesRowSlider title="Shorts Series" categoryName="shorts" showSeason={true} />
        <MoviesRowSlider title="Student" categoryName="student" />
        <MoviesRowSlider title="Student Series" categoryName="student" showSeason={true} />
        <MoviesRowSlider title="Women In Film" categoryName="womenInFilm" />
        <MoviesRowSlider title="Women In Film Series" categoryName="womenInFilm" showSeason={true} />
      </div>
    </div>
  );
};

export default Browse;
