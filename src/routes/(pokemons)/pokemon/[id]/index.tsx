import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { PokemonGameContext } from '~/context';
import { usePokemonGame } from '~/hooks/usePokemonGame';

export const usePokemonId = routeLoader$( ( { params, redirect } ) => {

	const id = Number( params.id );

	if ( isNaN( id ) ) redirect( 301, '/' );

	if ( id <= 0 || id > 1000 ) redirect( 301, '/' );

	return id;
} );

export default component$<number>( () => {

	// const location = useLocation();

	// const id = location.params.id as any;

	const pokemonId = usePokemonId();

	const {
		toggleFromBack,
		toggleVisible,
		isPokemonVisible,
		showBackImage
	} = usePokemonGame();

	return (
		<>
			{/* <span class="text-5xl">Pokemon: { location.params.id }</span> */ }
			<span class="text-5xl">Pokemon: { pokemonId }</span>

			<PokemonImage
				pokemonId={ pokemonId.value }
				isVisible={ isPokemonVisible.value }
				backImg={ showBackImage.value }
			/>

			<div class="mt-2">
				<button onClick$={ toggleFromBack } class="btn btn-primary mr-2">Voltear</button>
				<button onClick$={ toggleVisible } class="btn btn-primary">Revelar</button>
			</div>

		</>
	);

} );