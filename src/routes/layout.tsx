import { component$, Slot, useStyles$ } from '@builder.io/qwik';

import { PokemonProvider } from '~/context';
import Navbar from '~/components/shared/header/navbar';

import styles from './styles.css?inline';

export default component$( () => {
	useStyles$( styles );

	return (
		<PokemonProvider>
			<Navbar />
			<main class="flex flex-col items-center justify-center">
				<Slot />
			</main>
		</PokemonProvider>
	);
} );
