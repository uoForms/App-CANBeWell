# this file requires oyaml package
import os
import shutil
from pathlib import Path

import oyaml as yaml
from yaml import SafeDumper

output_folder_path = os.path.join('.github', 'workflows')

ci_build_json = "cypress/configs/ci-build.json"
ci_deploy_json = "cypress/configs/ci-deploy.json"


ci_build_ios_json = "cypress/configs/ci-build-ios.json"
ci_deploy_ios_json = "cypress/configs/ci-deploy-ios.json"

ci_build_android_json = "cypress/configs/ci-build-android.json"
ci_deploy_android_json = "cypress/configs/ci-deploy-android.json"

local_host = 'http://localhost:3000'

nightly_build = {"schedule": [{'cron': '0 4 * * *'}], "workflow_dispatch": None}
SafeDumper.add_representer(
    type(None),
    lambda dumper, value: dumper.represent_scalar(u'tag:yaml.org,2002:null', '')
)

def set_up():
    shutil.rmtree(str(output_folder_path), ignore_errors=True)
    Path(output_folder_path).mkdir(parents=True, exist_ok=True)


cancel_previous_run_step = {
    "name": "Cancel Previous Runs",
    "uses": "styfle/cancel-workflow-action@0.9.1",
    "with": {
        "access_token": "${{ github.token }}"
    }
}

check_out_step = {
    "name": "Checkout",
    "uses": "actions/checkout@v2",
}


def generate_cypress_upload_step(item_type, condition):
    return {
        "name": f"Cypress Upload {item_type.capitalize()}",
        "uses": "actions/upload-artifact@v2",
        "if": f"{condition}()",
        "with": {
            "name": f"cypress-{item_type}",
            "path": f"cypress/{item_type}",
            "retention-days": 7
        }
    }


upload_screenshot_step = generate_cypress_upload_step("screenshots", "failure")
upload_report_step = generate_cypress_upload_step("reports", "always")
upload_coverage_step = generate_cypress_upload_step("coverage", "success")


def generate_cypress_run_step(config_file, url=None, spec=None, config=None):
    spec_or_config = {}
    if spec:
        spec_or_config['spec'] = spec
    if config:
        spec_or_config['config'] = config

    url_dict = {}
    start_dict = {}
    if url:
        url_dict["wait-on"] = url
        start_dict["start"] = "yarn start-with-cy-coverage"
    return {
        "name": "Cypress Run",
        "uses": "cypress-io/github-action@v2",
        "with": {
            "config-file": config_file,
            "browser": "chrome",
            **url_dict,
            **spec_or_config,
            **start_dict
        }
    }


def generate_build_analytics_body(locale, user, age):
    spec = f"cypress/integration/dataAnalyticsTests/testSet/bodyPage-test-{locale}-{user}-{age}.js"
    return generate_file(
        f"Cypress(Development Build - Data Analytics - Body - {locale.capitalize()} - {user.capitalize()} - {age})",
        ["push"],
        [cancel_previous_run_step, check_out_step,
         generate_cypress_run_step(ci_build_json, local_host, spec=spec),
         upload_screenshot_step, upload_report_step,upload_coverage_step])


def generate_build_analytics_topic(locale, user):
    spec = f"cypress/integration/dataAnalyticsTests/testSet/topicPage-test-{locale}-{user}.js"
    return generate_file(
        f"Cypress(Development Build - Data Analytics - Topic - {locale.capitalize()} - {user.capitalize()})",
        ["push"],
        [cancel_previous_run_step, check_out_step,
         generate_cypress_run_step(ci_build_json, local_host, spec=spec),
         upload_screenshot_step, upload_report_step,upload_coverage_step])


def generate_build_analytics_test(locale):
    spec = f"cypress/integration/dataAnalyticsTests/testSet/testPage-test-{locale}.js"
    return generate_file(
        f"Cypress(Development Build - Data Analytics - Test - {locale.capitalize()})",
        ["push"],
        [cancel_previous_run_step, check_out_step,
         generate_cypress_run_step(ci_build_json, local_host, spec=spec),
         upload_screenshot_step, upload_report_step,upload_coverage_step])


def generate_build_text_body(locale, user):
    spec = f"cypress/integration/textLocaleTests/testSet/bodyPage-test-{locale}-{user}.js"
    return generate_file(
        f"Cypress(Development Build - Text Locale - Body - {locale.capitalize()} - {user.capitalize()})",
        ["push"],
        [cancel_previous_run_step, check_out_step,
         generate_cypress_run_step(ci_build_json, local_host, spec=spec),
         upload_screenshot_step, upload_report_step,upload_coverage_step])


def generate_build_text_topic(locale, user):
    spec = f"cypress/integration/textLocaleTests/testSet/topicPage-test-{locale}-{user}.js"
    return generate_file(
        f"Cypress(Development Build - Text Locale - Topic - {locale.capitalize()} - {user.capitalize()})",
        ["push"],
        [cancel_previous_run_step, check_out_step,
         generate_cypress_run_step(ci_build_json, local_host, spec=spec),
         upload_screenshot_step, upload_report_step,upload_coverage_step])


def generate_build_text_test(locale):
    spec = f"cypress/integration/textLocaleTests/testSet/testPage-test-{locale}.js"
    return generate_file(
        f"Cypress(Development Build - Text Locale - Test - {locale.capitalize()})",
        ["push"],
        [cancel_previous_run_step, check_out_step,
         generate_cypress_run_step(ci_build_json, local_host, spec=spec),
         upload_screenshot_step, upload_report_step,upload_coverage_step])

def generate_build_ios_homescreen_test():
    spec = f"cypress/integration/textLocaleTests/testSet/ios-add-to-home-screen.js"
    return generate_file(
        "Cypress(Development Build - Text Locale - IOS - Home Screen",
        ["push"],
        [cancel_previous_run_step, check_out_step,
         generate_cypress_run_step(ci_build_ios_json, local_host, spec=spec),
         upload_screenshot_step, upload_report_step,upload_coverage_step])

def generate_build_android_homescreen_test():
    spec = f"cypress/integration/textLocaleTests/testSet/android-add-to-home-screen.js"
    return generate_file(
        "Cypress(Development Build - Text Locale - Android - Home Screen",
        ["push"],
        [cancel_previous_run_step, check_out_step,
         generate_cypress_run_step(ci_build_android_json, local_host, spec=spec),
         upload_screenshot_step, upload_report_step,upload_coverage_step])

def generate_build_text_body_no_topic_config_dependent(start_age, end_age):
    spec = f"cypress/integration/textLocaleTests/testSet/bodyPage-test-no-topic-config-dependent-{start_age}-{end_age}.js"
    return generate_file(
        f"Cypress(Development Build - Text Locale - Body - No Topic - Config Dependent - {start_age}-{end_age}",
        ["push"],
        [cancel_previous_run_step, check_out_step,
         generate_cypress_run_step(ci_build_json, local_host, spec=spec),
         upload_screenshot_step, upload_report_step,upload_coverage_step])


def generate_deploy_analytics_body(locale, user, age):
    spec = f"cypress/integration/dataAnalyticsTests/testSet/bodyPage-test-{locale}-{user}-{age}.js"
    return generate_file(
        f"Cypress(Deploy Build - Data Analytics - Body - {locale.capitalize()} - {user.capitalize()} - {age})",
        nightly_build,
        [check_out_step,
         generate_cypress_run_step(ci_deploy_json, spec=spec),
         upload_screenshot_step, upload_report_step])


def generate_deploy_analytics_topic(locale, user):
    spec = f"cypress/integration/dataAnalyticsTests/testSet/topicPage-test-{locale}-{user}.js"
    return generate_file(
        f"Cypress(Deploy Build - Data Analytics - Topic - {locale.capitalize()} - {user.capitalize()})",
        nightly_build,
        [check_out_step,
         generate_cypress_run_step(ci_deploy_json, spec=spec),
         upload_screenshot_step, upload_report_step])


def generate_deploy_analytics_test(locale):
    spec = f"cypress/integration/dataAnalyticsTests/testSet/testPage-test-{locale}.js"
    return generate_file(
        f"Cypress(Deploy Build - Data Analytics - Test - {locale.capitalize()})",
        nightly_build,
        [check_out_step,
         generate_cypress_run_step(ci_deploy_json, spec=spec),
         upload_screenshot_step, upload_report_step])


def generate_deploy_text_body(locale, user):
    spec = f"cypress/integration/textLocaleTests/testSet/bodyPage-test-{locale}-{user}.js"
    return generate_file(
        f"Cypress(Deploy Build - Text Locale - Body - {locale.capitalize()} - {user.capitalize()})",
        nightly_build,
        [check_out_step,
         generate_cypress_run_step(ci_deploy_json, spec=spec),
         upload_screenshot_step, upload_report_step])


def generate_deploy_text_topic(locale, user):
    spec = f"cypress/integration/textLocaleTests/testSet/topicPage-test-{locale}-{user}.js"
    return generate_file(
        f"Cypress(Deploy Build - Text Locale - Topic - {locale.capitalize()} - {user.capitalize()})",
        nightly_build,
        [check_out_step,
         generate_cypress_run_step(ci_deploy_json, spec=spec),
         upload_screenshot_step, upload_report_step])


def generate_deploy_text_test(locale):
    spec = f"cypress/integration/textLocaleTests/testSet/testPage-test-{locale}.js"
    return generate_file(
        f"Cypress(Deploy Build - Text Locale - Test - {locale.capitalize()})",
        nightly_build,
        [check_out_step,
         generate_cypress_run_step(ci_deploy_json, spec=spec),
         upload_screenshot_step, upload_report_step])


def generate_deploy_text_body_no_topic_config_dependent(start_age, end_age):
    spec = f"cypress/integration/textLocaleTests/testSet/bodyPage-test-no-topic-config-dependent-{start_age}-{end_age}.js"
    return generate_file(
        f"Cypress(Deploy Build - Text Locale - Body - No Topic - Config Dependent - {start_age}-{end_age}",
        nightly_build,
        [check_out_step,
         generate_cypress_run_step(ci_deploy_json, spec=spec),
         upload_screenshot_step, upload_report_step])


def generate_build_analytics_landing():
    return generate_file(
        "Cypress(Development Build - Data Analytics - Landing Page)",
        ["push"],
        [cancel_previous_run_step, check_out_step,
         generate_cypress_run_step(ci_build_json, local_host,
                                   spec="cypress/integration/dataAnalyticsTests/testSet/landingPage-test.js"),
         upload_screenshot_step, upload_report_step,upload_coverage_step])


def generate_deploy_analytics_landing():
    return generate_file(
        "Cypress(Deploy Build - Data Analytics - Landing Page)",
        nightly_build,
        [check_out_step,
         generate_cypress_run_step(ci_deploy_json,
                                   spec="cypress/integration/dataAnalyticsTests/testSet/landingPage-test.js"),
         upload_screenshot_step, upload_report_step])


def generate_build_text_body_no_topic():
    return generate_file(
        "Cypress(Development Build - Text Locale - Body - No Topic)",
        ["push"],
        [cancel_previous_run_step, check_out_step,
         generate_cypress_run_step(ci_build_json, local_host,
                                   spec="cypress/integration/textLocaleTests/testSet/bodyPage-test-no-topic.js"),
         upload_screenshot_step, upload_report_step,upload_coverage_step])


def generate_deploy_ios_homescreen_test():
    return generate_file(
        "Cypress(Deploy Build - Text Locale - IOS - Home Screen)",
        nightly_build,
        [check_out_step,
         generate_cypress_run_step(ci_deploy_ios_json,
                                   spec="cypress/integration/textLocaleTests/testSet/ios-add-to-home-screen.js"),
         upload_screenshot_step, upload_report_step])


def generate_deploy_android_homescreen_test():
    return generate_file(
        "Cypress(Deploy Build - Text Locale - Android - Home Screen)",
        nightly_build,
        [check_out_step,
         generate_cypress_run_step(ci_deploy_android_json,
                                   spec="cypress/integration/textLocaleTests/testSet/android-add-to-home-screen.js"),
         upload_screenshot_step, upload_report_step])


def generate_deploy_text_body_no_topic():
    return generate_file(
        "Cypress(Deploy Build - Text Locale - Body - No Topic)",
        nightly_build,
        [check_out_step,
         generate_cypress_run_step(ci_deploy_json,
                                   spec="cypress/integration/textLocaleTests/testSet/bodyPage-test-no-topic.js"),
         upload_screenshot_step, upload_report_step])


def generate_build_user_action():
    return generate_file(
        "Cypress(Development Build - User Action)",
        ["push"],
        [cancel_previous_run_step, check_out_step,
         generate_cypress_run_step(ci_build_json, local_host,
                                   config="integrationFolder=cypress/integration/userActionTests"),
         upload_screenshot_step, upload_report_step,upload_coverage_step])


def generate_deploy_user_action():
    return generate_file(
        "Cypress(Deploy Build - User Action)",
        nightly_build,
        [check_out_step,
         generate_cypress_run_step(ci_deploy_json, config="integrationFolder=cypress/integration/userActionTests"),
         upload_screenshot_step, upload_report_step])


def generate_file(name, on, steps):
    return {"name": name,
            "on": on,
            "jobs": {"cypress-run": {"runs-on": "ubuntu-20.04", "steps": steps}}}


def run():
    set_up()
    write_to_file('ci-build-cy-test-data-analytics-landing-page.yml', generate_build_analytics_landing())
    write_to_file('ci-build-cy-test-user-action.yml', generate_build_user_action())
    write_to_file('ci-build-cy-test-text-locale-body-no-topic.yml', generate_build_text_body_no_topic())
    write_to_file('ci-deploy-cy-test-data-analytics-landing-page.yml', generate_deploy_analytics_landing())
    write_to_file("ci-deploy-cy-test-user-action.yml", generate_deploy_user_action())
    write_to_file('ci-deploy-cy-test-text-locale-body-no-topic.yml', generate_deploy_text_body_no_topic())

    write_to_file('ci-build-cy-test-text-locale-ios.yml', generate_build_ios_homescreen_test())
    write_to_file('ci-deploy-cy-test-text-locale-ios.yml', generate_deploy_ios_homescreen_test())
    write_to_file('ci-build-cy-test-text-locale-android.yml', generate_build_android_homescreen_test())
    write_to_file('ci-deploy-cy-test-text-locale-android.yml', generate_deploy_android_homescreen_test())


    for args in [[18, 38], [39, 59], [60, 80], [81, 101], [102, 125], [126, 150]]:
        file_name = f"ci-build-cy-test-text-locale-body-no-topic-config-dependent-{args[0]}-{args[1]}.yml"
        content = generate_build_text_body_no_topic_config_dependent(args[0], args[1])
        write_to_file(file_name, content)
        file_name = f"ci-deploy-cy-test-text-locale-body-no-topic-config-dependent-{args[0]}-{args[1]}.yml"
        content = generate_deploy_text_body_no_topic_config_dependent(args[0], args[1])
        write_to_file(file_name, content)

    for locale in ['en', 'fr']:
        file_name = f"ci-build-cy-test-text-locale-test-{locale}.yml"
        content = generate_build_text_test(locale)
        write_to_file(file_name, content)
        file_name = f"ci-deploy-cy-test-text-locale-test-{locale}.yml"
        content = generate_deploy_text_test(locale)
        write_to_file(file_name, content)
        file_name = f"ci-build-cy-test-data-analytics-test-{locale}.yml"
        content = generate_build_analytics_test(locale)
        write_to_file(file_name, content)
        file_name = f"ci-deploy-cy-test-data-analytics-test-{locale}.yml"
        content = generate_deploy_analytics_test(locale)
        write_to_file(file_name, content)

        for user in ['patient', 'provider']:
            file_name = f"ci-build-cy-test-text-locale-body-{locale}-{user}.yml"
            content = generate_build_text_body(locale, user)
            write_to_file(file_name, content)
            file_name = f"ci-deploy-cy-test-text-locale-body-{locale}-{user}.yml"
            content = generate_deploy_text_body(locale, user)
            write_to_file(file_name, content)

            file_name = f"ci-build-cy-test-text-locale-topic-{locale}-{user}.yml"
            content = generate_build_text_topic(locale, user)
            write_to_file(file_name, content)
            file_name = f"ci-deploy-cy-test-text-locale-topic-{locale}-{user}.yml"
            content = generate_deploy_text_topic(locale, user)
            write_to_file(file_name, content)

            file_name = f"ci-build-cy-test-data-analytics-topic-{locale}-{user}.yml"
            content = generate_build_analytics_topic(locale, user)
            write_to_file(file_name, content)
            file_name = f"ci-deploy-cy-test-data-analytics-topic-{locale}-{user}.yml"
            content = generate_deploy_analytics_topic(locale, user)
            write_to_file(file_name, content)

            for age in ['18', '50', '70', 'all-age']:
                if user == 'patient' and age == 'all-age':
                    continue
                file_name = f"ci-build-cy-test-data-analytics-body-{locale}-{user}-{age}.yml"
                content = generate_build_analytics_body(locale, user, age)
                write_to_file(file_name, content)
                file_name = f"ci-deploy-cy-test-data-analytics-body-{locale}-{user}-{age}.yml"
                content = generate_deploy_analytics_body(locale, user, age)
                write_to_file(file_name, content)


def write_to_file(file_name, content):
    file_path = os.path.join(output_folder_path, file_name)
    file = open(file_path, 'w')
    file.write(
        '# This file is automatically generated by scripts/generate_cypress_test_workflow_ci_configs.py, please do not manually update this file. Update the script! \n')
    yaml.safe_dump(content, file, width=1000)



def generate_status_page():
    status_badges = []
    for filename in os.listdir(output_folder_path):
        status_badge ='[!'
        with open(os.path.join(output_folder_path, filename), 'r') as f:
            yaml_file = yaml.safe_load(f)
            status_badge+=f'[{yaml_file["name"]}]'
        status_badge+=f"(https://github.com/uoForms/App-CANBeWell/actions/workflows/{filename}/badge.svg)"
        status_badge += ']'
        status_badge +=f'(https://github.com/uoForms/App-CANBeWell/actions/workflows/{filename})'
        status_badges.append(status_badge)

    with open(os.path.join('cypress','testStatus.md'), 'w') as f:
        f.write("[comment]: <> (This file is automatically generated by scripts/generate_cypress_test_workflow_ci_configs.py, please do not manually update this file. Update the script!)")
        f.write('\n\n')
        for status_badge in status_badges:
            f.write(status_badge)
            f.write('\n\n')




run()
generate_status_page()
