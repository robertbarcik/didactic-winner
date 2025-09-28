const toggleButtons = document.querySelectorAll('.card__toggle');
const meterValue = document.querySelector('[data-meter-value]');
const form = document.querySelector('.prompt-lab');
const previewEmpty = document.querySelector('.prompt-preview__empty');
const previewContent = document.querySelector('.prompt-preview__content');
const previewTopic = document.querySelector('[data-preview-topic]');
const previewFormat = document.querySelector('[data-preview-format]');
const previewCreativity = document.querySelector('[data-preview-creativity]');
const previewPrompt = document.querySelector('[data-preview-prompt]');

// Module cards toggle behaviour
for (const button of toggleButtons) {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    const details = document.getElementById(targetId);

    if (!details) return;

    details.classList.toggle('is-open');

    // Ensure only one card is open at a time for focused exploration
    if (details.classList.contains('is-open')) {
      for (const other of document.querySelectorAll('.card__details')) {
        if (other !== details) {
          other.classList.remove('is-open');
        }
      }
    }
  });
}

// Prompt lab slider value update
if (form) {
  const creativitySlider = form.querySelector('input[name="creativity"]');

  if (creativitySlider && meterValue) {
    creativitySlider.addEventListener('input', (event) => {
      meterValue.textContent = event.target.value;
      const value = Number(event.target.value);
      let descriptor = 'Medium creativity';

      if (value < 30) descriptor = 'Low creativity';
      else if (value > 70) descriptor = 'High creativity';

      creativitySlider.setAttribute('aria-valuetext', descriptor);
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const topic = (formData.get('topic') || '').trim();
    const format = (formData.get('format') || '').trim();
    const creativity = formData.get('creativity');

    if (!topic) {
      if (previewContent) previewContent.hidden = true;
      if (previewEmpty) {
        previewEmpty.hidden = false;
        previewEmpty.textContent = 'Please add a topic to build your prompt.';
      }
      return;
    }

    const creativityNumber = Number(creativity);
    let creativityDescription = 'balanced and focused';

    if (creativityNumber < 30) {
      creativityDescription = 'precise and analytical';
    } else if (creativityNumber > 70) {
      creativityDescription = 'imaginative and exploratory';
    }

    if (previewTopic) previewTopic.textContent = topic;
    if (previewFormat)
      previewFormat.textContent =
        format || 'Let the model choose an appropriate structure.';
    if (previewCreativity)
      previewCreativity.textContent = `${creativityNumber} / 100 (${creativityDescription})`;
    if (previewPrompt)
      previewPrompt.textContent =
        `You are a generative AI assistant. Use a ${creativityDescription} tone to respond about "${topic}" and present the results in ${
          format || 'the most engaging format for the learner'
        }.`;

    if (previewEmpty) previewEmpty.hidden = true;
    if (previewContent) previewContent.hidden = false;
  });
}

// Prompt idea generator
const subjects = [
  'a robot philosopher',
  'a city on Mars',
  'an eco-conscious classroom',
  'a time-traveling historian',
  'a community of sentient coral reefs',
  'a collaborative AI art studio'
];

const styles = [
  'in the style of a comic book',
  'as a photorealistic 4K photo',
  'as a documentary narration',
  'written like an inspiring manifesto',
  "as a whimsical children's story",
  'as a set of interactive workshop steps'
];

const compositions = [
  'at sunset',
  'during a lunar eclipse',
  'in a minimalist setting',
  'inside a bustling makerspace',
  'under the ocean surface',
  'during a festival of lights'
];

const ideaButton = document.getElementById('generate-idea');
const ideaOutput = document.getElementById('prompt-idea-output');

if (ideaButton && ideaOutput) {
  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

  ideaButton.addEventListener('click', () => {
    const subject = getRandomItem(subjects);
    const style = getRandomItem(styles);
    const composition = getRandomItem(compositions);

    ideaOutput.textContent = `Create a prompt about ${subject} ${style} ${composition}.`;
  });
}
