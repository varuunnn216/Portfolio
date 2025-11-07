export default function Row({ title, projects }) {
  return (
    <div className="px-10 my-8">
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="flex space-x-6 overflow-x-scroll scrollbar-hide">
        {projects.map((p) => (
          <div key={p.title} className="min-w-[200px] transform hover:scale-105 transition duration-200">
            <img src={p.img} alt={p.title} className="rounded-lg w-full h-40 object-cover" />
            <p className="mt-2 text-sm">{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
