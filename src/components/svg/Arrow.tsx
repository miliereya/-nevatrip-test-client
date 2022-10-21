import { FC } from "react"

interface SVGProps {
	width?: string
	height?: string
	fill?: string
	rotate?: number
	margin?: string
}

export const ArrowSVG: FC<SVGProps> = ({ width = '26px', height = '28px', fill = '#222', rotate = 0, margin = '0' }) => {
	return (
		<svg style={{
			transform: `rotate(${rotate}deg)`,
			margin: margin
		}} width={width} height={height} fill={fill} viewBox='0 0 26 28' xmlns='http://www.w3.org/2000/svg'>
			<path d='M8.96558 6.31094L10.0167 5.25L18.7156 14L10.0167 22.75L8.96558 21.6945L16.6082 14L8.96558 6.31094Z' />
		</svg>
	)
}
