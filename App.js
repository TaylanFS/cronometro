import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

let timer = null;
let seconds = 0;
let minutes = 0;
let hours = 0;

export default function App() {
	const [number, setNumber] = useState("00:00:00");
	const [buttonGo, setButtonGo] = useState("GO");
	const [lastDisplay, setLastDisplay] = useState(null);

	function go() {
		if (timer !== null) {
			clearInterval(timer);
			timer = null;
			setButtonGo("GO");
		} else {
			timer = setInterval(() => {
				seconds++;

				if (seconds == 60) {
					seconds = 0;
					minutes++;
				}
				if (minutes == 60) {
					minutes = 0;
					hours++;
				}

				let format =
					(hours < 10 ? "0" + hours : hours) +
					":" +
					(minutes < 10 ? "0" + minutes : minutes) +
					":" +
					(seconds < 10 ? "0" + seconds : seconds);

				setNumber(format);
			}, 1000);

			setButtonGo("STOP");
		}
	}

	function clear() {
		if (timer !== null) {
			clearInterval(timer);
			timer = null;

			setLastDisplay(number);

			setNumber("00:00:00");
			seconds = 0;
			minutes = 0;
			hours = 0;

			setButtonGo("GO");
		}
	}

	return (
		<View style={styles.container}>
			<Image source={require("./src/images/crono.png")} />

			<Text style={styles.timer}> {number} </Text>

			<View style={styles.buttonArea}>
				<TouchableOpacity style={styles.button} onPress={go}>
					<Text style={styles.textButton}> {buttonGo} </Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={clear}>
					<Text style={styles.textButton}> CLEAR </Text>
				</TouchableOpacity>
			</View>

			<View style={styles.lastTime}>
				<Text style={styles.lastTimeText}>
					{" "}
					{lastDisplay ? "Last time: " + lastDisplay : ""}{" "}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#00aeef",
	},
	timer: {
		marginTop: -160,
		fontSize: 45,
		fontWeight: "bold",
		color: "#FFF",
	},
	buttonArea: {
		flexDirection: "row",
		marginTop: 130,
		height: 40,
	},
	button: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFF",
		height: 40,
		margin: 17,
		borderRadius: 25,
	},
	textButton: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#00aeef",
	},
	lastTime: {
		marginTop: 40,
	},
	lastTimeText: {
		fontSize: 25,
		color: "#FFF",
		fontStyle: "italic",
	},
});
