import { useEffect, useState } from "react";
import axios from "axios";
import PackageCard from "../components/PackageCard";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // FETCH PACKAGES FROM BACKEND (CUSTOMER SIDE)
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/packages/customer"
        );
<<<<<<< HEAD
        // ✅ Filter only active packages
        const activePackages = res.data.filter((pkg) => pkg.isActive);
        setPackages(activePackages);
=======
        setPackages(res.data);
>>>>>>> origin/master
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // SEARCH & CATEGORY FILTER
  const filteredPackages = packages
    .filter((pkg) =>
      pkg.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((pkg) =>
      category === "All" ? true : pkg.category === category
    );

  // LOADING STATE
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading packages...
      </div>
    );
  }

  return (
    <section className="bg-[#faf7f2] py-16">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-serif text-center mb-10">
          Our Premium Packages
        </h2>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search packages..."
            className="p-3 rounded-md border w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-3 rounded-md border"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>

        {/* PACKAGES GRID */}
        {filteredPackages.length === 0 ? (
          <p className="text-center text-gray-500">
            No packages available at the moment.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Packages;
