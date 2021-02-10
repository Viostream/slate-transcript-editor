/**
 * converted from react-transcript-editor draftJS update timestamp helper function
 * https://github.com/pietrop/react-transcript-editor/blob/master/packages/components/timed-text-editor/UpdateTimestamps/index.js
 *
 */
import { alignSTT } from 'stt-align-node';
// import alignSTT from '../../../stt-align-node';
import slateToText from '../../txt';
// Yo
/**
 * Update timestamps usign stt-align module
 * @param {*} currentContent - slate js value
 * @param {*} words - list of stt words
 * @return slateJS value
 */
export const updateTimestampsHelper = (currentContent, dpeTranscript) => {
  // trying to align only text that changed

  // covert t=slate to text to use alignment module
  const currentText = slateToText({
    value: currentContent,
    speakers: false,
    timecodes: false,
    atlasFormat: false,
  });
  const alignedWords = alignSTT(dpeTranscript, currentText);
  // clean up
  const alignedWordsCleanedUp = alignedWords.filter((word) => {
    if (word.text) {
      return word;
    }
  });
  return alignedWordsCleanedUp;
};

export default updateTimestampsHelper;
