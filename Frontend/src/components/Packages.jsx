import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PackageCard from "../components/PackageCard";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);

  // FETCH PACKAGES
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/packages/customer"
        );

        const activePackages = res.data.filter((pkg) => pkg.isActive);
        setPackages(activePackages);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages
    .filter((pkg) =>
      pkg.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((pkg) =>
      category === "All" ? true : pkg.category === category
    );

  // SCROLL HANDLERS
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading packages...
      </div>
    );
  }

  return (
    <section  id="packages" className="bg-[#faf7f2] py-16">
      <div className="max-w-7xl mx-auto px-4 relative">

        <h2 className="text-4xl font-serif text-center mb-10">
          Our Premium Packages
        </h2>

        {/* SCROLL BUTTONS */}
        <button
  onClick={scrollLeft}
  className="absolute left-4 top-1/2 -translate-y-1/2 z-20
  bg-white shadow-lg p-3 rounded-full hover:bg-gray-100"
>
  ❮
</button>


        <button
  onClick={scrollRight}
  className="absolute right-4 top-1/2 -translate-y-1/2 z-20
  bg-white shadow-lg p-3 rounded-full hover:bg-gray-100"
>
  ❯
</button>


        {/* HORIZONTAL SCROLL */}
        {filteredPackages.length === 0 ? (
          <p className="text-center text-gray-500">
            No packages available at the moment.
          </p>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth
            scrollbar-hide px-6"
          >
            {filteredPackages.map((pkg) => (
              <div
                key={pkg._id}
                className="min-w-[380px] max-w-[380px]"
              >
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Packages;
