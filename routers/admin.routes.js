const express = require('express');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.render('admin/index');
// });

router.get('/', (req, res) => {
  const listPost = [
    {
      title: 'Man must explore, and this is exploration at its greatest',
      id: 1,
      subtitle: 'Problems look mighty small from 150 miles up',
      createBy: 'Start Bootstrap',
      createAt: 'September 24, 2019',
    },
    {
      title: `I believe every human has a finite number of heartbeats. I don't
            intend to waste any of mine.`,
      id: 2,
      subtitle: '',
      createBy: 'Start Bootstrap',
      createAt: 'September 18, 2019',
    },
    {
      title: 'Science has not yet mastered prophecy',
      id: 3,
      subtitle: 'We predict too much for the next year and yet far too little for the next ten.',
      createBy: 'Start Bootstrap',
      createAt: 'August 24, 2019',
    },
    {
      title: 'Failure is not an option',
      id: 4,
      subtitle: `Many say exploration is part of our destiny, but it’s actually our
            duty to future generations.`,
      createBy: 'Start Bootstrap',
      createAt: 'July 8, 2019',
    },
    {
      title: 'Man must explore, and this is exploration at its greatest',
      id: 5,
      subtitle: 'Problems look mighty small from 150 miles up',
      createBy: 'Start Bootstrap',
      createAt: 'September 24, 2019',
    },
    {
      title: `I believe every human has a finite number of heartbeats. I don't
            intend to waste any of mine.`,
      id: 6,
      subtitle: '',
      createBy: 'Start Bootstrap',
      createAt: 'September 18, 2019',
    },
    {
      title: 'Science has not yet mastered prophecy',
      id: 7,
      subtitle: 'We predict too much for the next year and yet far too little for the next ten.',
      createBy: 'Start Bootstrap',
      createAt: 'August 24, 2019',
    },
    {
      title: 'Failure is not an option',
      id: 8,
      subtitle: `Many say exploration is part of our destiny, but it’s actually our
            duty to future generations.`,
      createBy: 'Start Bootstrap',
      createAt: 'July 8, 2019',
    },
    {
      title: 'Man must explore, and this is exploration at its greatest',
      id: 9,
      subtitle: 'Problems look mighty small from 150 miles up',
      createBy: 'Start Bootstrap',
      createAt: 'September 24, 2019',
    },
    {
      title: `I believe every human has a finite number of heartbeats. I don't
            intend to waste any of mine.`,
      id: 10,
      subtitle: '',
      createBy: 'Start Bootstrap',
      createAt: 'September 18, 2019',
    },
    {
      title: 'Science has not yet mastered prophecy',
      id: 11,
      subtitle: 'We predict too much for the next year and yet far too little for the next ten.',
      createBy: 'Start Bootstrap',
      createAt: 'August 24, 2019',
    },
    {
      title: 'Failure is not an option',
      id: 12,
      subtitle: `Many say exploration is part of our destiny, but it’s actually our
            duty to future generations.`,
      createBy: 'Start Bootstrap',
      createAt: 'July 8, 2019',
    },
  ];
  res.render('client/page/index', {
    data: listPost,
  });
});

module.exports = router;
