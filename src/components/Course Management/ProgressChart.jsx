import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartWithCombinationsRecharts = ({ learnerProgresses }) => {
    const calculateCompletionPercentages = () => {
        const totalLearners = learnerProgresses.length;
        const quizCompletion = learnerProgresses.filter(progress => progress.quiz).length / totalLearners * 100;
        const noteCompletion = learnerProgresses.filter(progress => progress.note).length / totalLearners * 100;
        const videoCompletion = learnerProgresses.filter(progress => progress.video).length / totalLearners * 100;
        const allCompletion = learnerProgresses.filter(progress => progress.quiz && progress.note && progress.video).length / totalLearners * 100;
        const quizAndNoteCompletion = learnerProgresses.filter(progress => progress.quiz && progress.note && !progress.video).length / totalLearners * 100;
        const quizAndVideoCompletion = learnerProgresses.filter(progress => progress.quiz && !progress.note && progress.video).length / totalLearners * 100;
        const noteAndVideoCompletion = learnerProgresses.filter(progress => !progress.quiz && progress.note && progress.video).length / totalLearners * 100;
        const quizOnlyCompletion = learnerProgresses.filter(progress => progress.quiz && !progress.note && !progress.video).length / totalLearners * 100;
        const noteOnlyCompletion = learnerProgresses.filter(progress => !progress.quiz && progress.note && !progress.video).length / totalLearners * 100;
        const videoOnlyCompletion = learnerProgresses.filter(progress => !progress.quiz && !progress.note && progress.video).length / totalLearners * 100;
        const noneCompletion = learnerProgresses.filter(progress => !progress.quiz && !progress.note && !progress.video).length / totalLearners * 100;

        return [
            { name: 'Quiz', Completion: quizCompletion },
            { name: 'Note', Completion: noteCompletion },
            { name: 'Video', Completion: videoCompletion },
            { name: 'All', Completion: allCompletion },
            { name: 'Quiz & Note', Completion: quizAndNoteCompletion },
            { name: 'Quiz & Video', Completion: quizAndVideoCompletion },
            { name: 'Note & Video', Completion: noteAndVideoCompletion },
            { name: 'Quiz Only', Completion: quizOnlyCompletion },
            { name: 'Note Only', Completion: noteOnlyCompletion },
            { name: 'Video Only', Completion: videoOnlyCompletion },
            { name: 'None', Completion: noneCompletion },
        ];
    };

    return (
        <div className="chart-with-combinations-recharts">
            <ResponsiveContainer width='80%' height={400}>
                <BarChart /*width={800} height={400}*/ data={calculateCompletionPercentages()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ angle: -10 }} interval={0} dy={5} />
                    <YAxis />
                    <Tooltip />
                    <Legend /*layout="vertical" verticalAlign="top" align="right"*/ />
                    <Bar dataKey="Completion" fill='#3397FF' /*"#8884d8"*/ /*#4CAF50*/ />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartWithCombinationsRecharts;