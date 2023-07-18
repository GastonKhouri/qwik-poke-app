import { $, component$ } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { usePokemonGame } from '~/hooks/usePokemonGame';

export default component$( () => {

	const navigate = useNavigate();

	const {
		isPokemonVisible,
		nextPokemon,
		pokemonId,
		prevPokemon,
		showBackImage,
		toggleFromBack,
		toggleVisible
	} = usePokemonGame();

	const goToPokemon = $( () => {

		navigate( `/pokemon/${ pokemonId.value }/` );

	} );

	return (
		<>
			<span class="text-2xl">Buscador simple</span>
			<span class="text-9xl">{ pokemonId.value }</span>

			{/* <Link href={ `/pokemon/${ pokemonId.value }/` }>
			</Link> */}

			<div onClick$={ goToPokemon }>
				<PokemonImage
					pokemonId={ pokemonId.value }
					backImg={ showBackImage.value }
					isVisible={ isPokemonVisible.value }
				/>
			</div>

			<div class="mt-2">
				<button onClick$={ prevPokemon } class="btn btn-primary mr-2">Anterior</button>
				<button onClick$={ nextPokemon } class="btn btn-primary mr-2">Siguiente</button>
				<button onClick$={ toggleFromBack } class="btn btn-primary mr-2">Voltear</button>
				<button onClick$={ toggleVisible } class="btn btn-primary">Revelar</button>
			</div>

		</>
	);
} );

export const head: DocumentHead = {
	title: 'PokeQwik',
	meta: [
		{
			name: 'description',
			content: 'Primera app con Qwik',
		},
	],
};
