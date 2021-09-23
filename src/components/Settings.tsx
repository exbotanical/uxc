import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

function Settings() {
	const [theme, setTheme] = useContext(ThemeContext);

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<label htmlFor="theme">
					Theme
					<select
						value={theme}
						onChange={(e) => setTheme(e.target.value)}
						onBlur={(e) => setTheme(e.target.value)}
					>
						<option value="darkblue">dark blue</option>
						<option value="peru">peru</option>
						<option value="cartreuse">cartreuse</option>
						<option value="mediumorchid">medium orchid</option>
					</select>
				</label>
			</form>
		</div>
	);
}
export default Settings;
