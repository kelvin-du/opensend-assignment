export default function FormTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h2 className="text-lg font-bold text-center dark:text-gray-100">
        {title}
      </h2>
      <p className="text-center text-sm text-gray-500 dark:text-gray-300 pb-4 sm:pb-8">
        {description}
      </p>
    </>
  );
}
