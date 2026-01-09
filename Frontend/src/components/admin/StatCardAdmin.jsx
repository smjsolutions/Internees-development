export default function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white`}
      >
        ●
      </div>

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
