type PageHeaderProps = {
  title: string;
  highlight: string;
  subtitle: string;
};

const PageHeader = ({
  title,
  highlight,
  subtitle,
}: PageHeaderProps) => {
  return (
    <div className="">

      <h1 className="text-3xl font-bold tracking-wide text-white sm:text-4xl">
        {title}{" "}

        <span className="text-cyan-400">
          {highlight}
        </span>
      </h1>

      <p className="mt-2 text-sm text-zinc-400">
        {subtitle}
      </p>

    </div>
  );
};

export default PageHeader;