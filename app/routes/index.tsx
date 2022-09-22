import Hero, { links as heroLinks } from "~/components/sections/hero/hero";
import Services, { links as servicesLinks }  from "~/components/sections/services/services";

export const links = () => {
  return [
		...heroLinks(),
		...servicesLinks()
	];
};

// export let handle = { hydrate: true }

export default function index() {
  return (
		<>
			<Hero />
			<Services />
		</>
	);
}
