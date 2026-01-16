export const transformAnalysisData = (backendData) => {
  if (!backendData) {
    if (process.env.NODE_ENV === 'development') {
      console.error('transformAnalysisData: No backend data provided');
    }
    return null;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Raw backend data:', JSON.stringify(backendData, null, 2));
  }

  const summary = backendData.summary || {};
  const participantOneName = summary.participant_one_name || 'User One';
  const participantTwoName = summary.participant_two_name || 'User Two';

  const communication = backendData.communication || {};
  const participants = communication.participants || {};
  const userOne = participants.UserOne || {};
  const userTwo = participants.UserTwo || {};
  const styleDist = communication.style_distribution || [];

  const emotional = backendData.emotional_analysis || {};
  const emotionalUserOne = emotional.UserOne || {};
  const emotionalUserTwo = emotional.UserTwo || {};

  const flags = backendData.flags || {};
  const flagsUserOne = flags.UserOne || {};
  const flagsUserTwo = flags.UserTwo || {};

  const suggestions = backendData.suggestions || {};
  const trend = backendData.trend_projection || {};
  const futurePrediction = backendData.future_prediction || {};

  const transformMetrics = (metrics) => {
    if (!metrics || !Array.isArray(metrics)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('transformMetrics: metrics is not an array', metrics);
      }
      return {
        urgency: 0,
        emotional_expression: 0,
        calmness: 0,
        dependency: 0,
      };
    }

    const result = {};
    metrics.forEach((metric) => {
      if (metric && metric.label && typeof metric.value === 'number') {
        const key = metric.label.toLowerCase().replace(/\s+/g, '_');
        result[key] = metric.value;
      }
    });

    return {
      urgency: result.urgency ?? 0,
      emotional_expression: result.emotional_expression ?? 0,
      calmness: result.calmness ?? 0,
      dependency: result.dependency ?? 0,
    };
  };

  const transformStyleDistribution = (styles) => {
    if (!styles || !Array.isArray(styles) || styles.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('transformStyleDistribution: styles is not a valid array', styles);
      }
      return {
        assertive: 0,
        passive: 0,
        aggressive: 0,
        passive_aggressive: 0,
      };
    }

    const result = {
      assertive: 0,
      passive: 0,
      aggressive: 0,
      passive_aggressive: 0,
    };

    styles.forEach((style) => {
      if (style && style.style && typeof style.value === 'number') {
        const key = style.style.toLowerCase().replace(/\s+/g, '_');
        if (result.hasOwnProperty(key)) {
          result[key] = style.value;
        }
      }
    });

    return result;
  };

  const transformed = {
    participantNames: {
      user_one: participantOneName,
      user_two: participantTwoName,
    },
    summary: {
      relationship_type: summary.relationship_type || 'Unknown',
      dynamic_label: summary.dynamic_label || '',
      relationship_health_score: summary.relationship_health_score ?? 0,
      romantic_probability: Math.round((summary.romantic_probability ?? 0) * 100),
      overall_sentiment: summary.overall_sentiment || 'neutral',
    },
    timeline: {
      start_date: backendData.timeline?.start_date || 'N/A',
      end_date: backendData.timeline?.end_date || 'N/A',
      context: backendData.timeline?.context || '',
    },
    communication: {
      user_one: {
        communication_score: userOne.score ?? 0,
        communication_style: transformStyleDistribution(styleDist),
        strengths: Array.isArray(userOne.strengths) ? userOne.strengths : [],
        weaknesses: Array.isArray(userOne.weaknesses) ? userOne.weaknesses : [],
      },
      user_two: {
        communication_score: userTwo.score ?? 0,
        communication_style: transformStyleDistribution(styleDist),
        strengths: Array.isArray(userTwo.strengths) ? userTwo.strengths : [],
        weaknesses: Array.isArray(userTwo.weaknesses) ? userTwo.weaknesses : [],
      },
    },
    emotional_analysis: {
      user_one: transformMetrics(emotionalUserOne.metrics),
      user_two: transformMetrics(emotionalUserTwo.metrics),
    },
    flags: {
      user_one: {
        green_flags: Array.isArray(flagsUserOne.green) ? flagsUserOne.green : [],
        red_flags: Array.isArray(flagsUserOne.red) ? flagsUserOne.red : [],
      },
      user_two: {
        green_flags: Array.isArray(flagsUserTwo.green) ? flagsUserTwo.green : [],
        red_flags: Array.isArray(flagsUserTwo.red) ? flagsUserTwo.red : [],
      },
    },
    trend_projection: {
      relationship_health: Array.isArray(trend.relationship_health) ? trend.relationship_health : [0, 0, 0],
      emotional_stability: Array.isArray(trend.emotional_stability) ? trend.emotional_stability : [0, 0, 0],
    },
    future_prediction: {
      if_unchanged: futurePrediction.if_unchanged || '',
      if_improved: futurePrediction.if_improved || '',
    },
    suggestions: {
      user_one: Array.isArray(suggestions.UserOne) ? suggestions.UserOne : [],
      user_two: Array.isArray(suggestions.UserTwo) ? suggestions.UserTwo : [],
      both: Array.isArray(suggestions.both) ? suggestions.both : [],
    },
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('Transformed data:', JSON.stringify(transformed, null, 2));
  }
  return transformed;
};
