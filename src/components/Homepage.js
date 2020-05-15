import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
}));

const cards = [
	{
		title: 'Setup',
		description: 'Simple to set up and use!',
		imgsrc: '/images/cards/man-holding-phone.jpg',
	},
	{
		title: 'Send and request payments',
		description: 'Send and request payment!',
		imgsrc: '/images/cards/payment.jpg',
	},
	{
		title: 'Link to your bank account',
		description: 'Link to your bank account',
		imgsrc: '/images/cards/phone-and-computer.jpg',
	},
];

export default function Homepage() {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth='sm'>
						<Typography
							component='h1'
							variant='h2'
							align='center'
							color='textPrimary'
							gutterBottom>
							Super Nerd Wallet
						</Typography>
						<Typography
							variant='h5'
							align='center'
							color='textSecondary'
							paragraph>
							Join all your super nerdy friends and send and request money!
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify='center'>
								<Grid item>
									<Link to='/register'>
										<Button variant='contained' color='primary'>
											Register
										</Button>
									</Link>
								</Grid>
								<Grid item>
									<Link to='/login'>
										<Button variant='outlined' color='primary'>
											Login
										</Button>
									</Link>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth='md'>
					{/* End hero unit */}
					<Grid container spacing={4}>
						{cards.map((card) => (
							<Grid item key={card.title} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image={card.imgsrc}
										title={card.title}
									/>
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant='h5' component='h2'>
											{card.title}
										</Typography>
										<Typography>{card.description}</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
		</React.Fragment>
	);
}
