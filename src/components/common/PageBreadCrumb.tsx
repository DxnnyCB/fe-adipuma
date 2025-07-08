import { Link } from "react-router";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  pageTitle: string;
  breadcrumbs?: BreadcrumbItem[];
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle, breadcrumbs }) => {
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: "Home", to: "/dashboard" },
    { label: pageTitle }
  ];

  const crumbs = breadcrumbs && breadcrumbs.length > 0
    ? [{ label: "Home", to: "/dashboard" }, ...breadcrumbs]
    : defaultBreadcrumbs;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
        {pageTitle}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          {crumbs.map((crumb, idx) => (
            <li key={idx} className="flex items-center">
              {crumb.to ? (
                <Link
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                  to={crumb.to}
                >
                  {crumb.label}
                  {idx < crumbs.length - 1 && (
                    <svg
                      className="stroke-current"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                        stroke=""
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Link>
              ) : (
                <span className="text-sm text-gray-800 dark:text-white/90">{crumb.label}</span>
              )}
              {crumb.to && idx === crumbs.length - 2 && !crumbs[crumbs.length - 1].to && (
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
