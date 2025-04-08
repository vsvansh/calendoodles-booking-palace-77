
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				calendoodle: {
				  blue: '#3498db',
				  purple: '#9b59b6',
				  orange: '#f39c12',
				  green: '#2ecc71',
				  red: '#e74c3c',
				  cream: '#faf8f1',
				  charcoal: '#2c3e50',
				  darkBlue: '#1a365d',
				  darkPurple: '#4a235a',
				  darkGreen: '#1e6641',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				bounce: {
				  '0%, 100%': { transform: 'translateY(0)' },
				  '50%': { transform: 'translateY(-5px)' }
				},
				wiggle: {
				  '0%, 100%': { transform: 'rotate(-3deg)' },
				  '50%': { transform: 'rotate(3deg)' }
				},
				'fade-in': {
				  '0%': { opacity: '0' },
				  '100%': { opacity: '1' }
				},
				'slide-up': {
                  '0%': { transform: 'translateY(10px)', opacity: '0' },
                  '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'pulse-glow': {
                  '0%, 100%': { opacity: '0.8', filter: 'blur(8px)' },
                  '50%': { opacity: '0.4', filter: 'blur(12px)' }
                },
                'spin-slow': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' }
                },
                'ping': {
                  '75%, 100%': { transform: 'scale(2)', opacity: '0' },
                  '0%': { transform: 'scale(1)', opacity: '0.5' }
                },
                'scale-up': {
                  '0%': { transform: 'scale(0.95)', opacity: '0.7' },
                  '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'float': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-10px)' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce': 'bounce 1s infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'spin-slow': 'spin-slow 3s linear infinite',
                'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                'scale-up': 'scale-up 0.3s ease-out',
                'float': 'float 6s ease-in-out infinite'
			},
            boxShadow: {
              'glow-blue': '0 0 15px rgba(52,152,219,0.3)',
              'glow-purple': '0 0 15px rgba(155,89,182,0.3)',
              'glow-orange': '0 0 15px rgba(243,156,18,0.3)',
              'glow-green': '0 0 15px rgba(46,204,113,0.3)'
            },
            backdropFilter: {
              'none': 'none',
              'blur': 'blur(20px)'
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
