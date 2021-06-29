import SEO from '../components/SEO';

const Contact = () => {
  return (
    <div className="space-y-3">
      <SEO siteTitle="Contact" description="Contact information." />
      <h1 className="text-2xl text-gray-800 font-semibold">Contact</h1>
      <div>
        <p className="font-semibold">Mobile: +8801959609919</p>
        <p className="font-semibold">Location: Dhaka, Bangladesh</p>
      </div>
    </div>
  );
};

export default Contact;
