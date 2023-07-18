import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik';

export interface Props {
	pokemonId: number | string;
	size?: string;
	backImg?: boolean;
	isVisible?: boolean;
}

export const PokemonImage = component$( ( { pokemonId, size = "200px", backImg = false, isVisible = true }: Props ) => {

	const imageLoaded = useSignal( false );

	useTask$( ( { track } ) => {

		track( () => pokemonId );

		imageLoaded.value = false;

	} );

	const imgUrl = useComputed$( () => {

		if ( pokemonId === "" ) return '';

		return backImg
			? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ pokemonId }.png`
			: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ pokemonId }.png`;

	} );

	return (
		<div
			class="flex items-center justify-center"
			style={ { width: size, height: size } }
		>

			{ !imageLoaded.value && <span>Cargando...</span> }

			<img
				src={ imgUrl.value }
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