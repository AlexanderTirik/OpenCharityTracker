import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const theme: ThemeConfig = extendTheme({
	fonts: {
		body: 'Gilroy, sans-serif',
		heading: 'Gilroy, sans-serif'
	},
	initialColorMode: 'dark',
	useSystemColorMode: true,
})

export default theme
