import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PackageDetail = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/packages/${id}`
        );
        setPkg(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!pkg) {
    return (
      <div className="py-20 text-center text-gray-500">
        Package not found.
      </div>
    );
  }

  return (
    <section className="bg-[#faf7f2] pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* IMAGE */}
          <img
            src={`http://localhost:5000/${pkg.image}`}
            alt={pkg.name}
            className="w-full h-105 object-cover rounded-2xl shadow"
          />

          {/* CONTENT */}
          <div>
            <h1 className="text-4xl font-serif mb-2">{pkg.name}</h1>

            <p className="text-gray-600 mb-3">
              Duration: {pkg.totalDuration}
            </p>

            <p className="text-3xl font-bold text-[#c0954d] mb-6">
              {pkg.price}/-
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Included Services
            </h3>

<<<<<<< HEAD
{pkg.services.map((service) => (
  <li
    key={service._id}
    className="flex justify-between border-b pb-2 text-sm"
  >
    <span>{service.name}</span>
    <span className="text-gray-500">
      {service.duration} • Rs. {service.price}
    </span>
  </li>
))}


=======
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pkg.services.map((service, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-[#c0954d]">•</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
>>>>>>> origin/master

            <button className="bg-[#c0954d] text-white py-3 px-8 rounded-md mt-6">
              Book This Package
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PackageDetail;
