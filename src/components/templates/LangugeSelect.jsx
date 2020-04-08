import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	option: {
		fontSize: 15,
		'& > span': {
			marginRight: 10,
			fontSize: 18,
		},
	},
});

export default function languageSelect(props) {
	const classes = useStyles();

	return (
		<Autocomplete
			id='languages_select'
			options={Languages}
			classes={{
				option: classes.option,
			}}
			autoHighlight
			getOptionLabel={option => option.label}
			renderInput={params => (
				<TextField
					{...params}
					label='languages'
					variant='outlined'
					style={{ width: '100%' }}
					inputProps={{
						...params.inputProps,
						autoComplete: 'new-language',
					}}
				/>
			)}
			value={{ label: props.value }}
			onChange={(event, value) => {
				return props.handleChange(event, value, 'preferredlanguage');
			}}
		/>
	);
}
const Languages = [
	{ label: 'Afrikaans' },
	{ label: 'Albanian' },
	{ label: 'Amharic' },
	{ label: 'Arabic' },
	{ label: 'Armenian' },
	{ label: 'Azerbaijani' },
	{ label: 'Basque' },
	{ label: 'Belarusian' },
	{ label: 'Bengali' },
	{ label: 'Bosnian' },
	{ label: 'Bulgarian' },
	{ label: 'Catalan' },
	{ label: 'Cebuano' },
	{ label: 'Chichewa' },
	{ label: 'Chinese (Simplified)' },
	{ label: 'Chinese (Traditional)' },
	{ label: 'Corsican' },
	{ label: 'Croatian' },
	{ label: 'Czech' },
	{ label: 'Danish' },
	{ label: 'Dutch' },
	{ label: 'English' },
	{ label: 'Esperanto' },
	{ label: 'Estonian' },
	{ label: 'Filipino' },
	{ label: 'Finnish' },
	{ label: 'French' },
	{ label: 'Frisian' },
	{ label: 'Galician' },
	{ label: 'Georgian' },
	{ label: 'German' },
	{ label: 'Greek' },
	{ label: 'Gujarati' },
	{ label: 'Haitian (Creole)' },
	{ label: 'Hausa' },
	{ label: 'Hawaiian' },
	{ label: 'Hebrew' },
	{ label: 'Hindi' },
	{ label: 'Hmong' },
	{ label: 'Hungarian' },
	{ label: 'Icelandic' },
	{ label: 'Igbo' },
	{ label: 'Indonesian' },
	{ label: 'Irish' },
	{ label: 'Italian' },
	{ label: 'Japanese' },
	{ label: 'Javanese' },
	{ label: 'Kannada' },
	{ label: 'Kazakh' },
	{ label: 'Khmer' },
	{ label: 'Kinyarwanda' },
	{ label: 'Korean' },
	{ label: 'Kurdish (Kurmanji)' },
	{ label: 'Kyrgyz' },
	{ label: 'Lao' },
	{ label: 'Latin' },
	{ label: 'Latvian' },
	{ label: 'Lithuanian' },
	{ label: 'Luxembourgish' },
	{ label: 'Macedonian' },
	{ label: 'Malagasy' },
	{ label: 'Malay' },
	{ label: 'Malayalam' },
	{ label: 'Maltese' },
	{ label: 'Maori' },
	{ label: 'Marathi' },
	{ label: 'Mongolian' },
	{ label: 'Myanmar (Burmese)' },
	{ label: 'Nepali' },
	{ label: 'Norwegian' },
	{ label: 'Pashto' },
	{ label: 'Persian' },
	{ label: 'Polish' },
	{ label: 'Portuguese' },
	{ label: 'Punjabi' },
	{ label: 'Romanian' },
	{ label: 'Russian' },
	{ label: 'Samoan' },
	{ label: 'Scots Gaelic' },
	{ label: 'Serbian' },
	{ label: 'Sesotho' },
	{ label: 'Shona' },
	{ label: 'Sindhi' },
	{ label: 'Sinhala' },
	{ label: 'Slovak' },
	{ label: 'Slovenian' },
	{ label: 'Somali' },
	{ label: 'Spanish' },
	{ label: 'Sundanese' },
	{ label: 'Swahili' },
	{ label: 'Swedish' },
	{ label: 'Tajik' },
	{ label: 'Tamil' },
	{ label: 'Telugu' },
	{ label: 'Thai' },
	{ label: 'Turkish' },
	{ label: 'Ukrainian' },
	{ label: 'Urdu' },
	{ label: 'Uzbek' },
	{ label: 'Vietlabelse' },
	{ label: 'Welsh' },
	{ label: 'Xhosa' },
	{ label: 'Yiddish' },
	{ label: 'Yoruba' },
	{ label: 'Zulu' },
];
