/**
 * converted from react-transcript-editor draftJS update timestamp helper function
 * https://github.com/pietrop/react-transcript-editor/blob/master/packages/components/timed-text-editor/UpdateTimestamps/index.js
 * similar to updateTimestamps
 */
import countWords from '../../count-words';
import updateTimestampsHelper from './update-timestamps/update-timestamps-helper';
/**
 * Transposes the timecodes from stt json list of words onto
 * dpe transcript with paragraphs and words
 */
export const createDpeParagraphsFromSlateJs = (currentContent, newEntities) => {
  console.log('currentContent', currentContent);
  // Update entites to block structure.
  // const updatedBlockArray = [];
  let totalWords = 0;

  const updatedBlockArray = currentContent.map((block) => {
    // const block = currentContent[blockIndex];
    const text = block.children[0].text;
    const wordsInBlock = countWords(text);
    console.log('totalWords, totalWords , wordsInBlock, totalWords + wordsInBlock', totalWords, totalWords, wordsInBlock, totalWords + wordsInBlock);
    console.log('newEntities', newEntities);
    const blockEntites = newEntities.slice(totalWords, totalWords + wordsInBlock);
    console.log('blockEntites', blockEntites);

    // if (!blockEntites) {
    //   return updatedBlockArray;
    // } else {
    let speaker = block.speaker;
    console.log('blockEntites[0].start', blockEntites[0], blockEntites);
    const start = parseFloat(blockEntites[0].start);
    const end = parseFloat(blockEntites[blockEntites.length - 1].end);
    if (!speaker) {
      speaker = 'U_UKN';
    }
    const updatedBlock = {
      speaker: speaker,
      start,
      end,
    };

    // updatedBlockArray.push(updatedBlock);
    totalWords += wordsInBlock;
    return updatedBlock;
    // }
  });
  return updatedBlockArray;
};

/**
 * Update timestamps usign stt-align module
 * @param {*} currentContent - slate js value
 * @param {*} words - list of stt words
 * @return dpe transcript with paragraphs and words
 */
const converSlateToDpe = (currentContent, words) => {
  const alignedWords = updateTimestampsHelper(currentContent, words);
  console.log('alignedWords', alignedWords);
  const updatedContent = createDpeParagraphsFromSlateJs(currentContent, alignedWords);
  return { words: alignedWords, paragraphs: updatedContent };
};

export default converSlateToDpe;
