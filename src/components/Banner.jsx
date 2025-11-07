export default function Banner({ title, subtitle }) {
  return (
    <div className="h-[60vh] bg-cover bg-center flex flex-col justify-center px-10"
         style={{ backgroundImage: `url('/images/banner-bg.jpg')` }}>
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="mt-4 text-lg text-gray-300">{subtitle}</p>
    </div>
  );
}
