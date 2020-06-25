import React, { useState } from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

// Component
import Button from '../components/Button'

/**
 * About App screen and with Language setup button
 **/
const About = () => {
    // used for translation
    const { t, i18n } = useTranslation()
    // used for navigation
    const navigation = useNavigation()

    // change App language
    const [appLanguage, setAppLanguage] = useState(i18n.language)

    const listLanguage = [
        { key: 'en', label: 'English 🇬🇧' },
        { key: 'ge', label: 'ქართული 🇬🇪' },
    ]

    const onChangeLanguage = async (languageSelected) => {
        await i18n.changeLanguage(languageSelected)
        setAppLanguage(languageSelected)
    }

    // Opens Feedback screen 
    const feedbackHandler = () => navigation.navigate('Feedback')

    return (
        <View style={styles.container}>
            <Text style={styles.info}>{t('about.info')}</Text>
            <Picker
                selectedValue={appLanguage}
                onValueChange={onChangeLanguage}
                style={styles.picker}
            >
                {listLanguage.map((languageItem, i) => {
                    return <Picker.Item key={i} value={languageItem.key} label={languageItem.label} />
                })}
            </Picker>
            <View style={styles.feedback}>
                <Button
                    onPress={feedbackHandler}
                    text={t('about.feedbackButton')}
                    buttonColor='#c7dceb'
                    textColor='black'
                />
            </View>
            <Text>
                {t('about.madeBy')} {new Date().getFullYear()}
            </Text>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: '#bacfde',
    },
    info: {
        flex: 1,
        top: 10,
        lineHeight: 20,
    },
    picker: {
        flex: 3,
        height: 200,
        width: 200,
    },
    feedback: {
        bottom: 45,
    }
})