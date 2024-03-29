import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import CustomText from "../common/Text";
import { RoundedButton } from "../common/Button";
import { Colors } from "../../Constants";
import { CustomInput } from "../common/Input";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";


export const CreateMC = ({ save, del, id, titleProp, questionsProp, graded }) => {

    const [DATA, setDATA] = useState([]);
    const [title, setTitle] = useState("")
    const [itemStates, setItemStates] = useState({});
    const [answers, setAnswers] = useState(questionsProp.answers)
    const [points, setPoints] = useState(questionsProp.points)
    const [choice, setChoice] = useState(questionsProp.answers)
    const [choiceVal, setChoiceVal] = useState(null)
    const [open, setOpen] = useState(false);


    useEffect(() => {
        console.log("questions in mc: ", questionsProp);
        console.log("index of question: ", id)
    }, [])


    const styles = StyleSheet.create({
        container: {
            minWidth: 600,
            backgroundColor: Colors.white,
            marginVertical: 5,
            minHeight: open ? 800 + DATA.length * 100 : 400 + DATA.length * 100,
            justifyContent: "flex-start"

        },
        title: {
            width: "90%"
        },
        input: {
            width: "80%"
        },
        answerContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"

        },
        newAnswer: {
            width: "50%",
            alignSelf: "center"
        },
        answer: {
            width: "50%"
        },
        correctAnswer: {
            width: "50%"
        },
        delete: {
            position: "absolute",
            right: -20,
            top: -10,
            zIndex: 2
        },
        questionHolder: {
            flexDirection: "column",
            width: "85%",
            alignItems: "center",
            alignSelf: "flex-end"
        },
        saveButton: {
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            marginVertical: 10

        },
        pointContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        pointInput: {
            width: "70%",
        },
        dropdownContainer: {
            width: "100%",
            alignItems: "center",
            paddingVertical: 40,
            minHeight: 100 + DATA.length * 50
        }
    })


    useEffect(() => {
        let outputArray = questionsProp.answers.map((str, index) => {
            return {
                label: str,
                value: index
            };
        });

        setChoice(outputArray)
        setChoiceVal(questionsProp.correctAnswer)
    }, [questionsProp])



    /**
     * 
     * @param {*} e character to check if number
     */
    const handlePointsInput = (e) => {
        const newValue = e.replace(/[^0-9]/g, '');
        console.log("regex changed: ", newValue)
        setPoints(newValue);
    }


    /**
     * 
     * @param {*} item , from adding a new answer
     * this function sets the state for the answer component, helper function
     */
    function handleAdd(item) {
        console.log("prev data: ", DATA);
        console.log("new item: ", item)
        setDATA([...DATA, item]);
        setItemStates((prev) => {
            const newState = { ...prev };
            newState[item.id] = { answer: "" };
            return newState;
        });
    }

    /**
     * @param {*} idx index to remove from DATA and the items 
     */
    function handleRemove(idx) {
        const newItems = [...DATA];
        newItems.splice(idx, 1);

        for (let i = 0; i < newItems.length; i++) {
            newItems[i].id = i;
        }
        setDATA(newItems);
        setItemStates((prev) => {
            const newState = { ...prev };
            delete newState[idx];
            return newState;
        });
    }



    //these 3 functions are equivalent to the ones in Matching 3, but for the answer value, an
    //and they only can update answers in state
    const addAnswer = () => {
        setAnswers([...answers, '']);
    };

    const removeAnswer = (index) => {
        const newInputs = [...answers];
        newInputs.splice(index, 1);
        setAnswers(newInputs);
    };

    const updateAnswers = (text, index) => {
        console.log("updating question: ", text, index)
        setAnswers((prevValues) => {
            const newTextInput = [...prevValues];
            newTextInput[index] = text;
            return newTextInput
        })
    };


    useEffect(() => {
        console.log("new render : ", DATA)
    }, [DATA])


    const RenderItem = ({ item }) => {
        useEffect(() => {
            console.log("answers ", answers)
            console.log("index: ", item.index)
            console.log("whole object: ", item)

        })

        const [answer, setAnswer] = useState(answers[item.index])


        return (
            <View style={styles.answerContainer}>
                <View style={styles.questionHolder}>
                    <CustomText p1 navbar style={{ textAlign: "center", maxWidth: "50%" }}>
                        {answers[item.index]}
                    </CustomText>
                    <CustomInput
                        style={styles.correctAnswer}
                        placeholder="Option ..."
                        value={answer}
                        onChangeText={setAnswer}
                        onBlur={() => updateAnswers(answer, item.index)}
                        iconName="clipboard"
                        autoCorrect={false}
                    />
                </View>

                <TouchableOpacity onPress={() => {
                    handleRemove(item.index);
                    removeAnswer(item.index)

                }}>
                    <Ionicons name="remove-circle" size={40} color={Colors.navbar} />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.delete} onPress={del}>
                <Ionicons name="remove-circle" size={40} color={Colors.cancel} />
            </TouchableOpacity>
            <CustomText p1 navbar style={{ textAlign: "center", maxWidth: "70%", alignSelf: "center", marginVertical: 5 }}>
                {titleProp}
            </CustomText>
            <CustomInput
                style={styles.title}
                placeholder="Question title ..."
                value={title}
                onChangeText={(title) => setTitle(title)}
                iconName="clipboard"
                autoCorrect={false}
            />

            <FlatList
                data={answers ? answers : DATA}
                renderItem={(item) => (
                    <RenderItem
                        item={item}
                        onPress={(answer, id) => {
                            const newData = [...DATA];
                            const index = DATA.findIndex((i) => i.id === id);
                            if (index !== -1) {
                                newData[index].answer = answer;
                                setDATA(newData);
                            }
                        }}
                    />
                )}
            />
            <RoundedButton
                style={styles.newAnswer}
                onPress={() => {
                    let newQuestion = {
                        answer: "",
                        id: DATA.length
                    };
                    handleAdd(newQuestion);
                    addAnswer()
                }}
            >
                Add answer
            </RoundedButton>
            {graded ? (<View style={styles.pointContainer}>
                <View style={styles.pointInput}>
                    <CustomInput
                        placeholder="Points "
                        value={points}
                        onChangeText={handlePointsInput}
                        iconName="clipboard"
                        autoCorrect={false}
                    /></View>
                <CustomText p1 navbar>{points}</CustomText>
            </View>) : null}
            <View style={styles.dropdownContainer}>
                <DropDownPicker
                    stickyHeader={true}
                    dropDownDirection={"down"}
                    open={open}
                    setOpen={setOpen}
                    value={choiceVal}
                    setValue={setChoiceVal}
                    setItems={setChoice}
                    items={choice}
                    placeholder="Select answer"
                    defaultIndex={0}
                    containerStyle={{ height: 20, width: "50%", zIndex: 2000 }}
                    onChangeItem={item => console.log("chosen object: ", item.id, item.value)}
                />
            </View>
            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                    console.log("going up the tree... ",
                        {
                            title: title,
                            answers: answers,
                            points: points,
                            correctAnswer: choiceVal
                        });
                    save(id,
                        {
                            title: title,
                            answers: answers,
                            type: 0,
                            points: points,
                            correctAnswer: choiceVal
                        })
                }}>

                <Ionicons name="checkmark-circle" size={50} color={Colors.confirm} />
                <CustomText p2 confirm>save</CustomText>

            </TouchableOpacity>
        </View>
    )
}