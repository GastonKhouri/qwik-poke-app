import { component$, useSignal, useTask$ } from '@builder.io/qwik';

export interface Props {
	pokemonId: number;
	size?: string;
	backImg?: boolean;
	isVisible?: boolean;
}

export const PokemonImage = component$( ( { pokemonId, size = "200px", backImg = false, isVisible = false }: Props ) => {

	const imageLoaded = useSignal( false );

	useTask$( ( { track } ) => {

		track( () => pokemonId );

		imageLoaded.value = false;

	} );

	const imgUrl = backImg
		? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ pokemonId }.png`
		: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ pokemonId }.png`;

	return (
		<div
			class="flex items-center justify-center"
			style={ { width: size, height: size } }
		>

			{ !imageLoaded.value && <span>Cargando...</span> }

			<img
				src={ imgUrl }
				alt="pokemon sprite"
				style={ { width: size } }
				onLoad$={ () => imageLoaded.value = true }
				class={ [ {
					"hidden": !imageLoaded.value,
					"brightness-0": !isVisible
				}, 'transition-all' ] }
			/>
		</div>
	);

} );