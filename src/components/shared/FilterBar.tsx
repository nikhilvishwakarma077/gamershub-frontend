type FilterBarProps = {
    searchPlaceholder?: string;
};

const FilterBar = ({
    searchPlaceholder = "Search...",
}: FilterBarProps) => {
    return (
        <div className="mb-8 flex flex-col gap-4 lg:flex-row">

            {/* SEARCH */}
            <input
                type="text"
                placeholder={searchPlaceholder}
                className="
          flex-1 rounded-2xl
          border border-zinc-800
          bg-zinc-900
          px-5 py-4
          text-white
          outline-none
          transition
          focus:border-cyan-400
        "
            />

            {/* ROLE */}
            <select
                className="
          rounded-2xl border border-zinc-800
          bg-zinc-900
          px-5 py-4
          text-zinc-300
          outline-none
          focus:border-cyan-400
        "
            >
                <option>All Roles</option>

                <option>Primary Rusher</option>

                <option>Secondary Rusher</option>

                <option>Nader/Support</option>

                <option>Sniper</option>

                <option>Primary Rusher + IGL</option>

                <option>Secondary Rusher + IGL</option>

                <option>Nader/Support + IGL</option>

                <option>Sniper + IGL</option>

                


            </select>

            {/* AVAILABILITY */}
            <select
                className="
          rounded-2xl border border-zinc-800
          bg-zinc-900
          px-5 py-4
          text-zinc-300
          outline-none
          focus:border-cyan-400
        "
            >
                <option>Joining Type</option>

                <option>Permanent</option>

                <option>Temporary</option>

                <option>Scrims Only</option>
            </select>
        </div>
    );
};

export default FilterBar;